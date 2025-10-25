import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {
  getPreferences,
  updatePreferences,
  UserPreferences,
} from '../api/preferencesService';

interface PreferencesContextValue {
  preferences: UserPreferences | null;
  loading: boolean;
  refreshPreferences: () => Promise<void>;
  setPreferences: (prefs: UserPreferences) => Promise<void>;
}

const PreferencesContext = createContext<PreferencesContextValue | undefined>(
  undefined
);

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferencesState] = useState<UserPreferences | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch preferences on mount
  useEffect(() => {
    let mounted = true;
    const fetchPrefs = async () => {
      try {
        const prefs = await getPreferences();
        if (mounted) setPreferencesState(prefs);
      } catch (err) {
        console.error('Failed to fetch preferences', err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchPrefs();
    return () => {
      mounted = false;
    };
  }, []);

  const refreshPreferences = async () => {
    setLoading(true);
    try {
      const prefs = await getPreferences();
      setPreferencesState(prefs);
    } catch (err) {
      console.error('Failed to refresh preferences', err);
    } finally {
      setLoading(false);
    }
  };

  const setPreferences = async (prefs: UserPreferences) => {
    try {
      const updated = await updatePreferences(prefs);
      setPreferencesState(updated);
    } catch (err) {
      console.error('Failed to update preferences', err);
      throw err;
    }
  };

  return (
    <PreferencesContext.Provider
      value={{ preferences, loading, refreshPreferences, setPreferences }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextValue => {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used within PreferencesProvider');
  }
  return ctx;
};

export { PreferencesContext };
