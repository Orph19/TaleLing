import { useState, useEffect, useMemo } from 'react';
import {
  Query,
  onSnapshot,
  FirestoreError,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';

/**
 * Defines the shape of the return value for the useFirestoreQuery hook.
 */
interface FirestoreQueryState<T> {
  /** The array of data from the Firestore query. Null during initial load or on error. */
  data: T[] | null;
  /** True while the initial data set is being fetched. */
  loading: boolean;
  /** Holds any FirestoreError that occurred during the query. */
  error: FirestoreError | null;
}

/**
 * A generic, reusable hook for subscribing to a real-time Firestore query.
 *
 * This hook manages the entire lifecycle of an `onSnapshot` listener for a query,
 * including setting up the listener, mapping the results, handling loading and
 * error states, and ensuring proper cleanup. It is the foundational tool for
 * displaying any real-time collection of data in the application.
 *
 * @template T The expected type for the documents in the collection.
 * @param {Query | null | undefined} query The Firestore Query object to execute. If null or undefined, the hook will not run.
 * @returns {FirestoreQueryState<T>} A stable object containing the query's `data`, `loading` state, and `error`.
 */
export function useFirestoreQuery<T>(
  query: Query<DocumentData> | null | undefined
): FirestoreQueryState<T> {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    // If no query is provided (e.g., waiting for user authentication),
    // set a non-loading, empty state and do nothing.
    if (!query) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    // Reset state for a new query.
    setLoading(true);
    setError(null);
    setData(null);

    // Set up the real-time listener.
    const unsubscribe = onSnapshot(
      query,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        // Map the documents from the snapshot to the desired data type.
        // It's crucial to include the document ID in the final object.
        const result: T[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        } as T));
        
        setData(result);
        setLoading(false);
        setError(null);
      },
      (firestoreError: FirestoreError) => {
        // Handle any errors from the listener.
        console.error("[useFirestoreQuery] Listener error:", firestoreError);
        setError(firestoreError);
        setLoading(false);
        setData(null);
      }
    );

    // The cleanup function returned by useEffect will be called when the component
    // unmounts or when the `query` dependency changes, preventing memory leaks.
    return () => unsubscribe();

  }, [query]); // The effect is re-run whenever the query object itself changes.

  // useMemo ensures that the hook returns a stable object reference unless the
  // underlying data actually changes, preventing unnecessary re-renders in consumer components.
  return useMemo(() => ({
    data,
    loading,
    error
  }), [data, loading, error]);
}