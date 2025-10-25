//Only used for local development. Rename this file to admin.development or so before deploying.

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
// 1. Import the getStorage function
import { getStorage } from 'firebase-admin/storage';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const serviceAccount = require('../../admin-sdk-example.json');

if (!admin.apps.length) {
    if (process.env.NODE_ENV === 'development') {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),

            storageBucket: `${serviceAccount.project_id}.appspot.com`
        });
    } else {
        // In production, it can often infer this, but being explicit is safer
        admin.initializeApp();
    }
}

// Initialize services AFTER the app has been initialized.
const db = getFirestore();

// 2. Get a reference to the default storage bucket
const bucket = getStorage().bucket();

// 3. Export both db and bucket for use in your application
export { db, bucket };