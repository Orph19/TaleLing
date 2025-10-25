import { Context, Next } from 'hono';
import { jwtVerify, decodeProtectedHeader, importX509, JWTPayload } from 'jose';

// In-memory cache for Firebase's public keys to avoid fetching them on every request.
let publicKeysCache: Record<string, string> | null = null;
let cacheExpiry = 0;

/**
 * Fetches Google's x509 public keys for verifying Firebase ID tokens.
 * Implements a cache with max-age from the response's Cache-Control header.
 * @returns {Promise<Record<string, string>>} A map of key IDs to PEM-encoded public keys.
 */
async function getFirebasePublicKeys(): Promise<Record<string, string>> {
  const now = Date.now() / 1000;
  if (publicKeysCache && now < cacheExpiry) {
    return publicKeysCache;
  }

  const resp = await fetch('https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com');
  if (!resp.ok) {
    throw new Error('Failed to fetch Firebase public keys.');
  }
  
  const keys = await resp.json() as Record<string, string>;
  const cacheControl = resp.headers.get('Cache-Control') ?? '';
  const maxAgeMatch = /max-age=(\d+)/.exec(cacheControl);
  const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : 3600; // Default to 1 hour
  
  publicKeysCache = keys;
  cacheExpiry = now + maxAge;
  
  return keys;
}

/**
 * Verifies a Firebase ID token using the corresponding public key.
 * @param {string} idToken - The JWT ID token from the client.
 * @param {string} projectId - Your Firebase project ID.
 * @returns {Promise<JWTPayload>} The decoded payload of the token if valid.
 * @throws {Error} If the token is invalid, expired, or the key is not found.
 */
async function verifyFirebaseToken(idToken: string, projectId: string): Promise<JWTPayload> {
  const header = decodeProtectedHeader(idToken);
  const kid = header.kid;
  if (!kid) {
    throw new Error('ID token is missing "kid" (Key ID) in its header.');
  }

  const publicKeys = await getFirebasePublicKeys();
  const pem = publicKeys[kid];
  if (!pem) {
    throw new Error(`Public key not found for the provided kid: ${kid}. The key may have been rotated. Please try again.`);
  }

  const importedKey = await importX509(pem, 'RS256');
  
  const { payload } = await jwtVerify(idToken, importedKey, {
    algorithms: ['RS256'],
    audience: projectId,
    issuer: `https://securetoken.google.com/${projectId}`,
  });
  
  return payload;
}

/**
 * Hono middleware to protect routes by verifying a Firebase ID token.
 * It expects a "Bearer <token>" in the Authorization header.
 * If the token is valid, it attaches the user payload to the context at `c.set('firebaseUser', payload)`.
 */
export const firebaseAuthMiddleware = async (c: Context, next: Next) => {
  if (c.req.method === 'OPTIONS') {
    return await next();
  }

  const authHeader = c.req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Unauthorized', details: 'Authorization header is missing or malformed.' }, 401);
  }

  const idToken = authHeader.substring(7); // We already have the token here!
  const firebaseProjectId = c.env.FIREBASE_PROJECT_ID as string;

  if (!firebaseProjectId) {
    console.error('FIREBASE_PROJECT_ID is not configured in the environment.');
    return c.json({ error: 'Server configuration error' }, 500);
  }

  try {
    const payload = await verifyFirebaseToken(idToken, firebaseProjectId);

    const uid = payload?.uid ?? payload?.sub ?? payload?.user_id;
    if (!uid) {
      console.error('firebaseAuthMiddleware: token payload missing uid/sub/user_id', payload);
      return c.json({ error: 'Invalid token payload' }, 401);
    }
    c.set('firebaseUser', {
      uid,
      email: payload.email
     });  
    c.set('idToken', idToken);        // raw token for later server-side ops
    await next();
  } catch (err: any) {
    return c.json({ error: 'Invalid token', details: err.message }, 401);
  }
};