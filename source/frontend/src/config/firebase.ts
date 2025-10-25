/**
 * @file Firebase Configuration
 * @description Initializes the Firebase application and exports Firebase services.
 *              This is the single point of entry for all Firebase-related functionality.
 */

import { initializeApp, getApp, getApps } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
// Note: We don't need getFirestore or getAnalytics on the client
// if all database interaction is happening through our secure backend.

// Your web app's Firebase configuration, loaded from environment variables.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// --- Firebase App Initialization ---
// This is a professional pattern to prevent re-initializing the app on hot reloads.
// It checks if an app instance already exists; if not, it creates one.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// --- Exported Firebase Services ---
// We only export the services that are actually used in the client-side application.
// In our refactored app, this is primarily the Authentication service.
export const auth = getAuth(app);

export const db = getFirestore(app)
// If you were to use Firestore directly on the client in the future,
// you would initialize and export it here.
// export const db = getFirestore(app);