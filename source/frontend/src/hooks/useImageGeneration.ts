import { useState, useMemo, useEffect } from 'react'; // Import useEffect
import { useAsyncJob } from './useAsyncJob';
import { useError } from '../context/ErrorContext';
import * as imageService from '../api/imageService';

interface ImageGenerationState {
  isGenerating: boolean;
  imageUrl: string | null;
  generate: (storyId: string, style: string) => Promise<void>;
}

export function useImageGeneration(initialRequestId: string | null = null): ImageGenerationState {
  const [requestId, setRequestId] = useState<string | null>(initialRequestId);
  const [isApiCallLoading, setIsApiCallLoading] = useState<boolean>(false);
  const { setError } = useError();

  // --- THIS IS THE FIX ---
  // This effect synchronizes the internal `requestId` state with the `initialRequestId` prop.
  // It ensures that if the parent component finds a pending job *after* the initial render,
  // this hook will update itself and start listening.
  useEffect(() => {
    // If a new initialRequestId is passed in and it's different from our current state...
    if (initialRequestId && initialRequestId !== requestId) {
      // ...update our internal state to match the prop.
      setRequestId(initialRequestId);
    }
  }, [initialRequestId, requestId]); // This effect runs whenever the prop or our state changes.


  const { data: imageUrlFromJob, status: jobStatus } = useAsyncJob<string>('images', requestId);

  const generate = async (storyId: string, style: string) => {
    if (isApiCallLoading || requestId) {
      console.warn("[useImageGeneration] A generation job is already in progress.");
      return;
    }

    setIsApiCallLoading(true);
    
    try {
      const clientSideRequestId = crypto.randomUUID();
      await imageService.generateStoryImage({ 
        requestId: clientSideRequestId, 
        storyId, 
        style 
      });
      setRequestId(clientSideRequestId);
    } catch (err: any) {
      console.error('[useImageGeneration] Failed to initiate image generation:', err);
      setError(err.message || 'Failed to start image generation.', 'Generation Failed');
      setRequestId(null);
    } finally {
      setIsApiCallLoading(false);
    }
  };

  const isGenerating = useMemo(() => 
    isApiCallLoading || jobStatus === 'pending', 
    [isApiCallLoading, jobStatus]
  );

  return { 
    isGenerating, 
    imageUrl: imageUrlFromJob,
    generate 
  };
}