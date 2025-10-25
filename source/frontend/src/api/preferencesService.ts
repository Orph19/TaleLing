// src/api/preferencesService.ts
import { _fetchWithAuth } from '../utils/helpers'; // <-- Your pre-configured fetch/axios wrapper

export interface UserPreferences {
  sourceLang: string; // e.g. 'en'
  targetLang: string; // e.g. 'es'
}

/**
 * Fetch user preferences from the worker backend.
 * Worker will internally read the user document, but it can not perform updates.
 */
export async function getPreferences(): Promise<UserPreferences> {
  return await _fetchWithAuth(
    '/api/users/preferences',
    {
      method: 'GET',
    }

  ) as UserPreferences;
}

/**
 * Update user preferences via the worker backend.
 * @param prefs Updated language preferences.
 */
export async function updatePreferences(prefs: UserPreferences): Promise<UserPreferences> {
  return await _fetchWithAuth(
    '/api/users/preferences', 
    {
      method: 'POST',
      body: JSON.stringify(prefs)
    }
    
  );
}
