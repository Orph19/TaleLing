import React, { useEffect, useState } from 'react';
import { IonSpinner } from '@ionic/react';
import { usePreferences } from '../../hooks/usePreferences';
import  LanguageSelectorModal  from './LanguageSelectorModal';

/**
 * PreferencesGate
 * Wrap your protected pages with this gate to ensure user preferences
 * are loaded and a language is selected before rendering the app.
 */
export const PreferencesGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { preferences, loading, refreshPreferences } = usePreferences();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Only open the modal after preferences finish loading
    if (!loading && !preferences) {
      setShowModal(true);
    }
  }, [loading, preferences]);

  const handleComplete = async () => {
    setShowModal(false);
    await refreshPreferences(); // fetch the stored preferences after saving
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <IonSpinner name="dots" />
      </div>
    );
  }

  return (
    <>
      {children}
      <LanguageSelectorModal isOpen={showModal} onComplete={handleComplete} />
    </>
  );
};
