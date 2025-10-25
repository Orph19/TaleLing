import { auth } from '../config/firebase';
import { API_BASE_URL } from '../config/apiConfig';
import type { User } from 'firebase/auth';
import { ApiError, RateLimitError } from './errors';

const waitForAuth = (): Promise<User> =>
  new Promise((resolve, reject) => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      if (user) resolve(user);
      else reject(new Error('No user is signed in.'));
    });
  });

/**
 * A private helper function to get the current user's Firebase ID token.
 * It ensures the token is fresh and centralizes the logic for reuse.
 * @returns {Promise<string>} The Firebase ID token.
 * @private
 */
export const _getIdToken = async (): Promise<string> => {
  let user = auth.currentUser;
  if (!user) {
      user = await waitForAuth(); // wait instead of throwing
  }
  return user.getIdToken(true); // refresh to avoid expired tokens
};

/**
 * A generic, authenticated fetch wrapper for making API calls.
 * It automatically handles adding the Authorization header and parsing JSON.
 * @param endpoint - The API endpoint to call (e.g., '/story').
 * @param options - Standard `fetch` options (method, body, etc.).
 * @returns {Promise<any>} The `data` property from the API response.
 * @private
 */
export const _fetchWithAuth = async (endpoint: string, options: RequestInit = {}): Promise<any> => {
  const idToken = await _getIdToken();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${idToken}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (response.status === 404) {
    throw new ApiError('Not Found', 404);
  }
  
  const result = await response.json();

  if (!response.ok) {
    const errorMessage = result.details || result.error || result.message || 'An unknown API error occurred';

    // --- THIS IS THE NEW LOGIC ---
    // Check for the specific rate limit error message from your backend.
    // Checking the status code is also a great, robust practice if your API sends it.
    if (response.status === 429 || (errorMessage as string).includes('Rate limit reached')) {
      throw new RateLimitError(errorMessage);
    }
    
    // For all other errors, throw a generic ApiError.
    throw new ApiError(errorMessage, response.status);
  }
  
  return result.data;
};