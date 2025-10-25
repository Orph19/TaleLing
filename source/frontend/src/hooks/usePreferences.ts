// src/hooks/usePreferences.ts
import { useContext, useCallback } from 'react';
import { PreferencesContext } from '../context/PreferencesContext';
import type { UserPreferences } from '../api/preferencesService';

/**
 * usePreferences
 * Thin, stable wrapper around PreferencesContext.
 * Returns the same API exposed by the context but with stable callbacks.
 */
export const usePreferences = () => {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }

  const { preferences, loading, refreshPreferences, setPreferences } = context;

  const updatePreferences = useCallback(
    async (prefs: UserPreferences) => {
      // delegate to context implementation; keep stable reference for consumers
      return await setPreferences(prefs);
    },
    [setPreferences]
  );

  const reloadPreferences = useCallback(async () => {
    return await refreshPreferences();
  }, [refreshPreferences]);

  return {
    preferences,
    loading,
    setPreferences: updatePreferences,
    refreshPreferences: reloadPreferences,
  };
};

export default usePreferences;
