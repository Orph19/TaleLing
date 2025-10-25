// src/hooks/useAsyncJob.ts
import { useMemo, useState, useEffect } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useFirestoreDocument } from './useFirestoreDocument';

/**
 * Represents the high-level status of the job from the component's perspective.
 */
export type AsyncJobStatus = 'idle' | 'pending' | 'success' | 'failed';

/**
 * A type constraint for documents that represent an async job.
 * This ensures any document used with this hook has the required `status` field.
 */
interface JobDocument<T> extends DocumentData {
  status: 'pending' | 'completed' | 'failed';
  content?: T;
  error?: string;
}

/**
 * Defines the return structure for the useAsyncJob hook.
 */
interface AsyncJob<T> {
  data: T | null;
  status: AsyncJobStatus;
  error: string | null;
  isLoading: boolean;
}

/**
 * A high-level hook that monitors the state of a backend asynchronous job
 * tracked by a Firestore document.
 *
 * It uses `useFirestoreDocument` to get the raw data and then translates the
 * document's specific fields (`status`, `content`, `error`) into a simplified,
 * consistent state for UI components.
 *
 * It is now resilient to the race condition where the listener starts before
 * the backend has created the initial job document.
 *
 * @template T The expected type of the `content` field in the job document.
 * @param {string} collectionName The Firestore collection where job documents are stored.
 * @param {string | null | undefined} requestId The unique ID of the job to monitor.
 * @returns {AsyncJob<T>} A stable object representing the job's state.
 */
export function useAsyncJob<T>(
  collectionName: string,
  requestId: string | null | undefined,
  retryKey: number = 0
): AsyncJob<T> {
  const { data: jobDoc, loading, error: listenerError } = useFirestoreDocument<JobDocument<T>>(
    collectionName,
    requestId,
    retryKey
  );

  // A state to track if the initial document creation has timed out.
  const [isTimedOut, setIsTimedOut] = useState(false);

  // This effect manages the timeout logic for initial document creation.
  useEffect(() => {
    // Always reset the timeout flag when the requestId changes.
    setIsTimedOut(false);

    // If there's no requestId, we don't need a timer.
    if (!requestId) {
      return;
    }

    // Set a timer. If the job document (`jobDoc`) doesn't appear within this
    // grace period, we will consider the job to have failed to start.
    const timer = setTimeout(() => {
      // If we still don't have a document after the timeout, mark as timed out.
      if (!jobDoc) {
        setIsTimedOut(true);
      }
    }, 7000); // 7-second grace period for the backend to create the document.

    // Cleanup function: If the component unmounts or if the jobDoc appears
    // before the timeout, we must clear the timer to prevent a false timeout.
    return () => clearTimeout(timer);
    
  }, [requestId, jobDoc]); // Re-run this logic if the request or the document changes.

  const derivedState = useMemo(() => {
    if (!requestId) {
      return { status: 'idle' as AsyncJobStatus, data: null, error: null };
    }

    if (listenerError) {
      return { status: 'failed' as AsyncJobStatus, data: null, error: 'A connection error occurred.' };
    }
    
    // If the timeout has been exceeded and we STILL don't have a document, it's a real error.
    if (isTimedOut && !jobDoc) {
      return { status: 'failed' as AsyncJobStatus, data: null, error: 'The operation timed out.' };
    }

    // While the very first document snapshot is loading AND we haven't timed out, we are pending.
    if (loading && !jobDoc) {
      return { status: 'pending' as AsyncJobStatus, data: null, error: null };
    }
    
    if (jobDoc) {
      switch (jobDoc.status) {
        case 'completed':
          return { status: 'success' as AsyncJobStatus, data: jobDoc.content ?? null, error: null };
        case 'failed':
          return { status: 'failed' as AsyncJobStatus, data: null, error: jobDoc.error || 'The process failed.' };
        case 'pending':
        default:
          return { status: 'pending' as AsyncJobStatus, data: null, error: null };
      }
    }
    
    // This is the key to fixing the race condition:
    // If we are not loading, have no document, but have NOT timed out yet,
    // we remain in the 'pending' state, patiently waiting for the document to be created.
    return { status: 'pending' as AsyncJobStatus, data: null, error: null };

  }, [jobDoc, loading, listenerError, requestId, isTimedOut]);

  return useMemo(() => ({
    ...derivedState,
    isLoading: derivedState.status === 'pending',
  }), [derivedState]);
}