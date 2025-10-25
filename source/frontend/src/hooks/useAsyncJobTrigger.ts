// src/hooks/useAsyncJobTrigger.ts
import { useState, useCallback } from 'react';
import { useAsyncJob, AsyncJobStatus } from './useAsyncJob';
import * as jobService from '../api/jobService';
import { RateLimitError } from '../utils/errors';
import { useError } from '../context/ErrorContext'; // --- CHANGE #1: Import the global error hook ---
// ... Interface definitions remain the same ...
interface UseAsyncJobTriggerParams<T> {
  collectionName: string;
  filters: Record<string, any>;
  createJobApiFunction: (params: any) => Promise<any>;
  checkCacheApiFunction?: () => Promise<T | null>;
  staleThresholdMs: number;
}
interface UseAsyncJobTriggerReturn<T> {
  status: AsyncJobStatus;
  data: T | null;
  error: string | null;
  isLoading: boolean;
  isChecking: boolean;
  isJobRunning: boolean;
  checkStatus: () => void;
  createJob: () => void;
}


export function useAsyncJobTrigger<T>({
  collectionName,
  filters,
  createJobApiFunction,
  checkCacheApiFunction,
  staleThresholdMs,
}: UseAsyncJobTriggerParams<T>): UseAsyncJobTriggerReturn<T> {

  const [requestId, setRequestId] = useState<string | null>(null);
  const [localData, setLocalData] = useState<T | null>(null);
   // --- CHANGE #2: Rename state to avoid naming conflicts and for clarity
  const [localError, setLocalError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);


  // --- CHANGE #3: Get the global error setter function
  const { setError: setGlobalError } = useError();

  const { data: jobData, status: jobStatus, error: jobError, isLoading: isJobRunning } = useAsyncJob<T>(collectionName, requestId);
  

  // --- THIS IS THE FINAL FIX ---
  // A resilient guard to ensure the hook never acts on incomplete data.
  const areFiltersValid = (f: Record<string, any>): boolean => {
    return Object.values(f).every(val => val !== undefined && val !== null);
  };

  const checkStatus = useCallback(async () => {
    // This guard makes the hook self-defending against the component's render lifecycle.
    if (!areFiltersValid(filters)) {
      return; // Do nothing if the storyId (or other filter) is not yet available.
    }
    
    setIsChecking(true);
    const pendingJob = await jobService.findPendingJob(collectionName, filters);
    if (pendingJob) {
      const isStale = Date.now() - pendingJob.createdAt.toDate().getTime() > staleThresholdMs;
      if (!isStale) {
        setRequestId(pendingJob.id);
      }
    }
    setIsChecking(false);
  }, [collectionName, filters, staleThresholdMs]);

  const createJob = useCallback(async () => {
    // This guard prevents creating a job with incomplete data.
    if (!areFiltersValid(filters)) {
      console.warn('[useAsyncJobTrigger] Attempted to create a job with invalid filters.', filters);
      return;
    }

    setIsChecking(true);
    setLocalError(null);
    setLocalData(null);
    setRequestId(null);

    try {
      if (checkCacheApiFunction) {
        const cachedResult = await checkCacheApiFunction();
        if (cachedResult) {
          setLocalData(cachedResult);
          return;
        }
      }

      const pendingJob = await jobService.findPendingJob(collectionName, filters);
      if (pendingJob) {
        const isStale = Date.now() - pendingJob.createdAt.toDate().getTime() > staleThresholdMs;
        if (!isStale) {
          setRequestId(pendingJob.id);
          return;
        }
      }

      const newRequestId = crypto.randomUUID();
      await createJobApiFunction({ requestId: newRequestId, ...filters });
      setRequestId(newRequestId);

    } catch (err: any) {
      // --- CHANGE #4: Enhance the catch block ---
      // Determine the best error message
      const errorMessage = (err instanceof RateLimitError)
        ? err.message
        : (err.message || 'An unexpected error occurred.');
      
      // Set the local error for any inline UI (like a retry button)
      setLocalError(errorMessage);

      // Set the global error to show the app-wide alert
      setGlobalError(errorMessage, 'Operation Failed');

    } finally {
      setIsChecking(false);
    }
  }, [collectionName, filters, createJobApiFunction, checkCacheApiFunction, staleThresholdMs]);

  const finalStatus = localData ? 'success' : (isChecking ? 'pending' : jobStatus);

  return {
    status: finalStatus,
    data: localData || jobData,
    error: localError || jobError, // Return the combined error state
    isLoading: isChecking || isJobRunning,
    isChecking,
    isJobRunning,
    checkStatus,
    createJob,
  };
}