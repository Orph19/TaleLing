import { Context } from 'hono';
// Import our new Firestore REST API helpers
import { docExists, getDoc } from '../../lib/firestore'; 
import { getEnvVarsAdmin } from '../../config/env';
import { comunicateApiAdmin } from '../../lib/api.admin'
import { FirebaseUser, UserDocument } from '../../utils/types';
/**
 * @controller initializeUser (Hono version)
 * @description Creates a user profile document in Firestore if one doesn't already exist.
 */
export const initializeUser = async (c: Context) => {
  try {
    // --- Step 1: Get data from the middleware context ---
    const userPayload:FirebaseUser = c.get('firebaseUser');
    const idToken = c.get('idToken'); // We need the token for our API calls
    const projectId = c.env.FIREBASE_PROJECT_ID as string;

    const uid = userPayload?.uid;
    const email = userPayload?.email;

    if (!uid || !email || !idToken) {

      return c.json({ message: 'Unauthorized: Missing user credentials in context at /initialize.' }, 401);
    }

    // --- Step 2: Check if the user document already exists using our helper ---
    const userAlreadyExists = await docExists(projectId, idToken, 'users', uid);
    
    if (userAlreadyExists) {
      return c.json({ message: 'User already initialized.' }, 200);
    }

    // --- Step 3: If not, create their user's document ---

    const envAdmin = getEnvVarsAdmin(c);
    const apiBaseUrl = envAdmin.apiUrl;
    const internalSecret = envAdmin.internalSecret;

    if (!apiBaseUrl || !internalSecret) {
      return c.json({ message: 'Server configuration error: Missing API URL or internal secret.' }, 500);
    }

    const response = await fetch(`${apiBaseUrl}/api/users/provision`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-API-Key': `${internalSecret}`,
      },
      body: JSON.stringify({userId:uid,email})
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error creating user document:', errorText);
      return c.json({ message: 'Failed to create user profile document.', error: errorText }, 500);
    }

    // If we reach here, the user profile was created successfully.

    return c.json({ message: 'User document created successfully.'}, 201);

  } catch (error: any) {
    console.error('Error initializing user:', error);
    return c.json({ message: 'An internal server error occurred.', error: error.message }, 500);
  }
};

/**
 * @controller checkUserExists
 * @description Checks if a Firestore document exists for the currently authenticated user.
 * This is used as a "safety net" by the client to ensure a user's profile
 * was created successfully after sign-up.
 */
export const checkUserExists = async (c: Context) => {
  try {
    // --- Step 1: Get the authenticated user's ID and token from middleware ---
    const userPayload:FirebaseUser = c.get('firebaseUser');
    const idToken = c.get('idToken');
    const projectId = c.env.FIREBASE_PROJECT_ID as string;
    const uid = userPayload?.uid;

    if (!uid || !idToken) {
      return c.json({ message: 'Unauthorized: Missing user credentials in context at /profile/exists.' }, 401);
    }

    // --- Step 2: Use our Firestore helper to perform the check ---
    // This calls the docExists function we already built.
    const exists = await docExists(projectId, idToken, 'users', uid);
    
    // --- Step 3: Return the result in the expected format ---
    return c.json({ exists: exists }, 200);

  } catch (error: any) {
    console.error('Error checking if user exists:', error);
    return c.json({ message: 'An internal server error occurred.', error: error.message }, 500);
  }
};

/**
 * @controller getUserPreferences
 * @description Fetchs directly the user Document from Firestore and returns its
 * preferences field
 */
export const getUserPreferences = async (c: Context) => {
  try {
    const firebaseUser = c.get('firebaseUser');
    const idToken = c.get('idToken');

    if (!firebaseUser?.uid || !idToken) {
      return c.json({ message: 'Unauthorized: Missing user credentials.' }, 401);
    }
    
    // Destructure properties for cleaner access and provide a fallback.
    const { uid } = firebaseUser;
    const { FIREBASE_PROJECT_ID: projectId } = c.env;

    const userDoc: UserDocument | null = await getDoc(projectId, idToken, 'users', uid);

    if (!userDoc) {
      return c.json({ message: 'User document not found.' }, 404);
    }
    
    // Explicitly check for the 'preferences' property.
    const preferences = userDoc.preferences ?? null;

    return c.json({ data: preferences }, 200);
  } catch (err) {
    // Log the full error object for detailed debugging in a production environment.
    console.error('Failed to fetch user preferences:', err);
    return c.json({ error: 'Internal Server Error: Unable to fetch user preferences.' }, 500);
  }
};

/**
 * @controller updateUserPreferences
 * @description Updates the user Document from Firestore and returns its
 * preferences field
 */
export const updateUserPreferences = async (c: Context) => {
  const firebaseUser = c.get('firebaseUser');
  const idToken = c.get('idToken');

  if (!firebaseUser?.uid || !idToken) {
    return c.json({ message: 'Unauthorized: Missing user credentials.' }, 401);
  }

  const envAdmin = getEnvVarsAdmin(c);
  const { uid } = firebaseUser;

  // Use a try-catch block for the async JSON parsing
  let preferences;
  try {
    preferences = await c.req.json();
  } catch (error) {
    return c.json({ message: 'Bad Request: Invalid JSON body.' }, 400);
  }

  const payload = {
    userId: uid,
    data: {
      preferences,
    },
  };

  const response = await comunicateApiAdmin(
    envAdmin,
    '/users/preferences',
    payload
  );

  // Check the status from the helper function's response
  if (response.status >= 200 && response.status < 300) {
    return c.json({ message: 'User preferences updated successfully.', data: preferences}, 200);
  }

  // Use the error message from the helper function
  const errorMsg = response.error || 'Unable to update user preferences.';
  return c.json({ message: `Internal Server Error: ${errorMsg}` }, 500);
};

