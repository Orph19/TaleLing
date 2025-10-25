// src/components/Translation/Translation.tsx
import React, { useEffect, useMemo, useCallback, useRef } from 'react';
import * as translationService from '../../api/translationService';
import * as jobService from '../../api/jobService';
import { TranslationContent } from '../../types'; // This type is now respected
import { useAsyncJobTrigger } from '../../hooks/useAsyncJobTrigger';
import { JOB_CONFIG } from '../../config/jobConfig';
import styles from './Translation.module.css';
import DefinitionList from './DefinitionList';

interface TranslationProps {
  word: string;
  sourceLang: string;
  targetLang: string;
  onClose: () => void;
}

const Translation: React.FC<TranslationProps> = ({ word, sourceLang, targetLang, onClose }) => {
  const MEANINGS_LIMIT = 1;
  const EXAMPLES_LIMIT = 1;
  const effectRan = useRef(false);

  const filters = useMemo(() => ({ word, sourceLang, targetLang }), [word, sourceLang, targetLang]);

  const createJobApiFunction = useCallback((params: any) => {
    return translationService.getTranslation(params);
  }, []);

  const checkCacheApiFunction = useCallback(async () => {
    return jobService.findCompletedJob<TranslationContent>('dictionary', filters);
  }, [filters]);


  const { status, data: content, error, isLoading, createJob } = useAsyncJobTrigger<TranslationContent>({
    collectionName: 'dictionary',
    filters,
    createJobApiFunction,
    checkCacheApiFunction,
    staleThresholdMs: JOB_CONFIG.translation.staleThresholdMs,
  });

  useEffect(() => {
    if (effectRan.current === false) {
      createJob();
      effectRan.current = true;
    }
  }, [createJob]);

  // This effect watches for an error from the async job hook.
  // If an error occurs, it automatically calls the onClose callback
  // to dismiss the popup, creating a clean user experience.
  useEffect(() => {
    // If the error state has a value (is not null)...
    if (error) {
      // ...close the popup.
      onClose();
    }
  }, [error, onClose]); // This effect runs only when the error or onClose function changes.
  
  const handleManualRetry = () => {
    createJob();
  };

  return (
    <div style={{ maxWidth: '320px', boxSizing: 'border-box', minWidth: 250, background: '#fff', border: '1px solid #ddd', borderRadius: 8, padding: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.15)', color: '#111827' }}>
      {isLoading && <div className="text-sm text-gray-500">Translating “{word}”...</div>}

      {status === 'success' && content && !isLoading && (
        <>
          {/* --- CHANGE: Reverted to the correct data access pattern.
              The 'content' prop is now guaranteed to be the TranslationContent object. */}
          <h4 className="font-semibold text-base mb-1">{`${word} (${content.translation})`}</h4>
          <div className="text-sm text-gray-700 mb-2">
            <strong>Meanings:</strong>
            <DefinitionList items={content.meanings} limit={MEANINGS_LIMIT} listClassName={styles.meaningsList} />
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <strong>Examples:</strong>
            <DefinitionList items={content.examples} limit={EXAMPLES_LIMIT} listClassName={styles.meaningsList} />
          </div>
          <button onClick={onClose} className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">Close</button>
        </>
      )}

      {status === 'failed' && !isLoading && (
        <div className="text-sm">
          <p className="font-semibold text-red-600">Error</p>
          <p className="text-gray-700">{error || 'Failed to translate.'}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={handleManualRetry} className="px-2 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600">Retry</button>
            <button onClick={onClose} className="px-2 py-1 bg-gray-400 text-white text-xs rounded hover:bg-gray-500">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Translation;