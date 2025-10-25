// src/api/jobService.ts
import { collection, query, where, getDocs, limit, Timestamp, FirestoreError, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db, auth } from '../config/firebase';

export interface PendingJob {
  id: string;
  createdAt: Timestamp;
  [key: string]: any;
}

/**
 * [Private] A generic helper to find the first job document that matches a given status.
 */
async function _findJobByStatus(
  collectionName: string,
  filters: Record<string, any>,
  status: 'pending' | 'completed'
): Promise<DocumentSnapshot<DocumentData> | null> {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    const jobsCollectionRef = collection(db, collectionName);
    
    let q = query(
      jobsCollectionRef,
      where("uid", "==", user.uid),
      where("status", "==", status),
      limit(1)
    );

    for (const [key, value] of Object.entries(filters)) {
      q = query(q, where(key, "==", value));
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.empty ? null : querySnapshot.docs[0];

  } catch (error) {
    console.error(`[_findJobByStatus] Error querying '${collectionName}' for '${status}' jobs:`, (error as FirestoreError).message);
    return null;
  }
}

/**
 * Finds a pending job in any collection for the current user.
 */
export async function findPendingJob(
  collectionName: string,
  filters: Record<string, any>
): Promise<PendingJob | null> {
  const doc = await _findJobByStatus(collectionName, filters, 'pending');

  if (!doc) return null;

  const data = doc.data();

  if (!data) return null;

  return {
    id: doc.id,
    createdAt: data.createdAt,
    ...data,
  } as PendingJob;
}

/**
 * Finds a completed job and returns its content payload.
 */
export async function findCompletedJob<T>(
  collectionName: string,
  filters: Record<string, any>
): Promise<T | null> {
  const doc = await _findJobByStatus(collectionName, filters, 'completed');

  if (!doc) return null;

  const data = doc.data();

  if (!data) return null;

  // --- CHANGE: This is the critical fix.
  // We now correctly access the 'content' field from the document, which holds the
  // actual data payload (e.g., the TranslationContent object), ensuring the
  // data shape is consistent with the real-time listener.
  return data.content as T ?? null;
}