// This file is used for production. Before deploying, rename this file to "admin".

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

const BUCKET_NAME = process.env.FIREBASE_STORAGE_BUCKET

admin.initializeApp({
    storageBucket: BUCKET_NAME 
});

// Initialize services AFTER the app has been initialized.
const db = getFirestore();

// Now this will work because the bucket name is configured globally.
const bucket = getStorage().bucket();

// Export both db and bucket for use in your application
export { db, bucket };