/**
 * @file Authentication Context
 * @description Manages and provides global authentication state.
 *              - Supports Google Sign-In and explicit sign-out.
 *              - Initializes new users on the backend.
 *              - Includes a "safety net" to ensure users have a backend profile.
 */
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  getAdditionalUserInfo
} from 'firebase/auth';
import { auth } from '../config/firebase';

// --- Step 1: Import BOTH user service functions ---
import { initializeUserInBackend, checkUserProfileExists } from '../api/userService';

/**
 * Defines the shape of the data that the AuthContext will provide.
 * (No changes here)
 */
type AuthContextType = {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create an instance of the Google provider
const googleProvider = new GoogleAuthProvider();

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // This useEffect now contains the critical "safety net" logic.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Set the user immediately for a responsive UI.
      setUser(firebaseUser);
      
      // --- The Safety Net ---
      // This runs every time the auth state is confirmed (e.g., on page load for a returning user).
      if (firebaseUser) {
        try {
            // Get the token needed to talk to our secure backend.
            const token = await firebaseUser.getIdToken(true);


            const decodedToken = jwtDecode(token);

            // Ask our backend if a profile document exists for this user.
            const profileExists = await checkUserProfileExists(token);

            // If the profile does NOT exist, it means our initial sign-up call
            // might have failed. We try to create it again to self-heal the account.
            if (!profileExists) {
                console.warn('User is authenticated but has no backend profile. Attempting to create one now.');
                await initializeUserInBackend(token);
            }
        } catch (error) {
            // This is not a critical failure for the user's session, but it's important to log.
            console.error('An error occurred during the user profile safety check:', error);
        }
      }
      
      // We only stop loading after the user is set AND the safety check is complete.
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts.
    return () => unsubscribe();
  }, []); // The empty array ensures this runs only once on initial app load.


  // This function handles the primary sign-in action.
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      
      // Check if this is a brand new user.
      const info = getAdditionalUserInfo(result);
      if (info?.isNewUser) {
        console.log('New user signed up! Initializing profile on backend...');
        try {
          const token = await result.user.getIdToken();
          // This is the primary initialization call.
          await initializeUserInBackend(token);
        } catch (error) {
          console.error("Critical: Failed to initialize new user on the backend immediately after sign-up.", error);
          // In a production app, you might want to alert the user or log this error more formally.
        }
      }
      // The onAuthStateChanged listener will also fire after this, running the safety net check
      // as a redundant but useful confirmation.
    } catch (error) {
      console.error("Google sign-in failed:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      // onAuthStateChanged will fire and set the user to null.
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  // The value provided to the rest of the app.
  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut: signOutUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};