// src/config/jobConfig.ts

// Default timeouts in milliseconds. These are used if environment variables are not set.
const DEFAULT_TRANSLATION_STALE_MS = 2 * 60 * 1000; // 2 minutes
const DEFAULT_IMAGE_STALE_MS = 5 * 60 * 1000;       // 5 minutes

/**
 * A centralized configuration object for asynchronous job settings.
 * It pulls values from environment variables for easy tuning per environment,
 * with sensible defaults.
 */
export const JOB_CONFIG = {
  translation: {
    staleThresholdMs: 
      parseInt(import.meta.env.VITE_TRANSLATION_STALE_MS as string, 10) || DEFAULT_TRANSLATION_STALE_MS,
  },
  image: {
    staleThresholdMs: 
      parseInt(import.meta.env.VITE_IMAGE_STALE_MS as string, 10) || DEFAULT_IMAGE_STALE_MS,
  },
};