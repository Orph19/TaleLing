import { isResetNeeded, 
  getPacificCurrentDate 
} from "../lib/dates.js";
import {getDefaultCredits} from "../utils/helpers.js"
import {createDoc,fetchDoc} from "../services/firestore.js"
import {LimitExceededError} from "../utils/types.js"
import admin from 'firebase-admin';
import {db} from './admin.js';
const cost = 1;
/**
 * 
 * @param {*} transaction The transaction object
 * @param {*} userRef The User doc reference
 * @param {string} creditBucket The credit bucket to look up and decrement if needed
 * @param {string} collection The collection's name where the new pending generation will be stored
 * @param {string} requestId Id of the generation request created by the client
 * @param {object} fields An object containing custom information of the generation (e.g. the user's story selections; words to translate; segments for context)
 * @returns 
 */
export async function reserveTransaction(transaction, userRef, creditBucket, collection, requestId, fields) {
  const userSnap = await transaction.get(userRef);

  if (!userSnap.exists) {
    throw new Error('User document does not exist!');
  }

  // Always work on a mutable copy of the data
  const userData = userSnap.data();

  // Lazy reset if needed
  if (isResetNeeded(userData.lastResetDate)) {
    console.log('A reset of credits is needed, reset will be conducted2')
    userData.credits = getDefaultCredits();
    userData.lastResetDate = getPacificCurrentDate();
  }

  if (!userData.credits || userData.credits[creditBucket] == null) {
    throw new Error(`Credit bucket "${creditBucket}" does not exist`);
  }

  if (userData.credits[creditBucket] < cost) {
    throw new LimitExceededError('Insufficient credits');
  }

  userData.credits[creditBucket] -= cost;

  // Track recent request IDs
  const recent = Array.isArray(userData.recentRequests) ? userData.recentRequests : [];
  const updatedRecent = [...recent, requestId].slice(-50);

  // Commit updated user doc
  transaction.update(userRef, {
    credits: userData.credits,
    lastResetDate: userData.lastResetDate,
    recentRequests: updatedRecent,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Prepare generation metadata
  const generationSchema = {
    uid: userRef.id,
    type: creditBucket,
    status: "pending",
    content: null,
    refunded: null,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  // Create the generation doc outside Firestore transaction since Firestore
  // doesn’t support creating new docs and reading the same collection atomically.
  const created = await createDoc(collection, requestId, {
    ...generationSchema,
    ...fields,
  });

  if (!created) {
    throw new Error('Failed to create generation document');
  }

  return { remainingCredits: userData.credits };
}

/**
 * 
 * @param {*} transaction The transaction object
 * @param {*} userRef The User doc reference
 * @param {string} creditBucket The credit bucket to look up and decrement if needed
 * @param {string} collection The collection's name where the request generation is stored
 * @param {string} requestId Id of the generation request created by the client
 * @returns 
 */
export async function refundTransaction(transaction, userId, creditBucket, collection, requestId) {
  const userRef = db.collection('users').doc(userId);
  const generationRef = db.collection(collection).doc(requestId);

  const userSnap = await transaction.get(userRef);

  if (!userSnap.exists) {
    throw new Error('User document does not exist!');
  }

  const userData = userSnap.data();

  // Lazy reset if needed
  if (isResetNeeded(userData.lastResetDate)) {
    userData.credits = getDefaultCredits();
    userData.lastResetDate = getPacificCurrentDate();
  }

  if (!userData.credits || userData.credits[creditBucket] == null) {
    throw new Error(`Credit bucket "${creditBucket}" does not exist`);
  }

  userData.credits[creditBucket] += cost;

  // Update user credits
  transaction.update(userRef, {
    credits: userData.credits,
    lastResetDate: userData.lastResetDate,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });

  // Mark generation as refunded
  transaction.update(generationRef, {
    refunded: true,
    status: 'failed',
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
}
