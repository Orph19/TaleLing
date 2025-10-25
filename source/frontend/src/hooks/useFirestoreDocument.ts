import { useState, useEffect } from 'react';
import { DocumentData, FirestoreError } from 'firebase/firestore';
import { listenToDocument } from '../api/firestoreService';

/**
 * Defines the return structure for the useFirestoreDocument hook.
 */
interface FirestoreDocumentState<T> {
  data: T | null;
  loading: boolean;
  error: FirestoreError | null;
}

/**
 * A generic, low-level hook for real-time listening to a single Firestore document.
 *
 * This hook encapsulates the logic of subscribing, handling data snapshots,
 * managing loading and error states, and unsubscribing on cleanup. It serves
 * as a foundational building block for more complex data-fetching logic.
 *
 * It does NOT contain any application-specific logic like retries or status parsing.
 *
 * @template T The expected TypeScript type of the document's data.
 * @param {string} collectionName The Firestore collection.
 * @param {string | null | undefined} docId The document ID. If null or undefined, the hook will not run.
 * @returns {FirestoreDocumentState<T>} An object with the document's `data`, `loading` state, and `error`.
 */
export function useFirestoreDocument<T extends DocumentData>(
  collectionName: string,
  docId: string | null | undefined,
  retryKey: number = 0
): FirestoreDocumentState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    // Do not proceed if the document ID is not provided.
    if (!docId) {
      setLoading(false);
      setData(null);
      return;
    }
    // Reset state each time the docId changes.
    setLoading(true);
    setError(null);
    setData(null);

    const handleSuccess = (documentData: T | null) => {
      setData(documentData);
      setLoading(false);
      setError(null);
    };

    const handleError = (firestoreError: FirestoreError) => {
      console.error(`[useFirestoreDocument] Listener error on ${collectionName}/${docId}:`, firestoreError);
      setError(firestoreError);
      setLoading(false);
    };

    // Establish the listener and store the returned unsubscribe function.
    const unsubscribe = listenToDocument<T>(
      collectionName,
      docId,
      handleSuccess,
      handleError
    );

    // This cleanup function is crucial. It runs when the component unmounts
    // or when the docId dependency changes, preventing memory leaks.
    return () => {
      unsubscribe();
    };
  }, [collectionName, docId, retryKey]); // The effect re-runs only when these values change.

  return { data, loading, error };
}