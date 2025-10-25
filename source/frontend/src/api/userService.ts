/**
 * @file User Service
 * @description Contains API functions related to user management.
 */

import { API_BASE_URL } from '../config/apiConfig'; // Assuming you have a constants file

/**
 * Notifies the backend that a new user has signed up, prompting the
 * backend to create a user profile document in Firestore.
 *
 * @param {string} token - The user's Firebase ID token for authentication.
 * @returns {Promise<void>}
 */
export const initializeUserInBackend = async (token: string): Promise<void> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/initialize`, {
      method: 'POST',
      headers: {
        // The 'Authorization' header is what our backend middleware will check
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      // If the backend returns an error (e.g., 500), we throw an error here.
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to initialize user on the backend.');
    }
    
  } catch (error) {
    console.error('Error in initializeUserInBackend:', error);
    // In a real app, you might want to log this to a monitoring service.
    // For now, we'll re-throw the error so the calling function knows something went wrong.
    throw error;
  }
};


/**
 * Checks if the currently authenticated user has a profile document on the backend.
 * @param {string} token - The user's Firebase ID token.
 * @returns {Promise<boolean>} True if the profile exists, false otherwise.
 */
export const checkUserProfileExists = async (token: string): Promise<boolean> => {
  try {
    // We'll need a new backend endpoint for this check
    const response = await fetch(`${API_BASE_URL}/api/users/profile/exists`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    if (!response.ok) {
        // If the server has an issue, we assume the profile might exist to be safe
        const errorBody = await response.text()
        console.error('Failed to check user profile existence:',errorBody);
        return true; 
    }
    const data = await response.json();
    return data.exists; // We expect the backend to return { exists: true } or { exists: false }
  } catch (error) {
    console.error('Error in checkUserProfileExists:', error);
    return true; // Fail safe
  }
};