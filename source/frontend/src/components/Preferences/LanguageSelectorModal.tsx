import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonFooter,
  IonSpinner,
} from '@ionic/react';
import { usePreferences } from '../../context/PreferencesContext';

interface Props {
  isOpen: boolean;
  onComplete: () => void;
}

// Minimal supported languages (extend later easily)
const SUPPORTED_LANGS = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  // { code: 'fr', name: 'French' },
  // { code: 'de', name: 'German' },
  // { code: 'it', name: 'Italian' },
];

const LanguageSelectorModal: React.FC<Props> = ({ isOpen, onComplete }) => {
  const { preferences, loading, setPreferences } = usePreferences();

  const [sourceLang, setSourceLang] = useState<string>('en');
  const [targetLang, setTargetLang] = useState<string>('es');
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (preferences) {
      setSourceLang(preferences.sourceLang || 'en');
      setTargetLang(preferences.targetLang || 'es');
    }
  }, [preferences]);

  const handleSave = async () => {
    if (!sourceLang || !targetLang || sourceLang === targetLang) {
      alert('Select two different languages.');
      return;
    }
    setSaving(true);
    try {
      await setPreferences({ sourceLang, targetLang });
      onComplete();
    } catch (err) {
      console.error('Failed to save preferences', err);
      alert('Failed to save preferences. Try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onComplete}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Select Languages</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {loading ? (
          <div className="ion-text-center">
            <IonSpinner />
          </div>
        ) : (
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Source Language</IonLabel>
              <IonSelect
                value={sourceLang}
                onIonChange={(e) => setSourceLang(e.detail.value)}
              >
                {SUPPORTED_LANGS.map((lang) => (
                  <IonSelectOption key={lang.code} value={lang.code}>
                    {lang.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Target Language</IonLabel>
              <IonSelect
                value={targetLang}
                onIonChange={(e) => setTargetLang(e.detail.value)}
              >
                {SUPPORTED_LANGS.map((lang) => (
                  <IonSelectOption key={lang.code} value={lang.code}>
                    {lang.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
        )}
      </IonContent>

      <IonFooter className="ion-padding">
        <IonButton expand="block" onClick={handleSave} disabled={saving}>
          {saving ? <IonSpinner name="dots" /> : 'Save'}
        </IonButton>
        <IonButton expand="block" fill="clear" onClick={onComplete}>
          Cancel
        </IonButton>
      </IonFooter>
    </IonModal>
  );
};

export default LanguageSelectorModal;
