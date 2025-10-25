import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSpinner,
  IonButton,
  IonAlert,
  IonToast
} from '@ionic/react';
import styles from './StoryContainer.module.css';
import Translation from '../../components/Translation/Translation';
import FloatingPopup from '../../components/Translation/FloatingPopup';
import { generateClickableWords, formatStoryText } from '../../utils/stringUtils';
import { usePreferences } from '../../hooks/usePreferences';
import { useAsyncJob } from '../../hooks/useAsyncJob'; // --- 1. IMPORT THE NEW HOOK ---
import Footer from '../../components/Footer/Footer';
import PageLayout from '../../components/PageLayout/PageLayout'; 

import type { FirestoreStoryDoc } from '../../types/firestore';

const Reader: React.FC = () => {
  const { id: requestId } = useParams<{ id: string }>();
  const contentRef = useRef<HTMLIonContentElement | null>(null);

  // --- 2. REPLACE LISTENER STATE WITH A SINGLE HOOK CALL ---
  // This state is now used only for the manual retry trigger.
  const [retryKey, setRetryKey] = useState(0);

  // This single line replaces all the repetitive listener state and useEffect logic.
  // We add `retryKey` to the dependency array of the hook to allow re-triggering.
  // Note: For a pure listener, this isn't strictly necessary as Firestore auto-reconnects,
  // but it ensures a full state reset if the user explicitly clicks "Retry".
  const { 
    data: storyDoc, 
    status, 
    error, 
    isLoading 
  } = useAsyncJob<FirestoreStoryDoc['content']>(
    'stories', 
    requestId,
    retryKey
  );

  // --- All other component state remains the same ---
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const { preferences, loading: prefsLoading } = usePreferences();

  // --- 3. DERIVE UI VALUES FROM THE HOOK'S STATE ---
  const storyText = storyDoc?.story || null;
  const storyTitle = storyDoc?.title || null;

  // --- 4. PRESERVE THE SCROLL-INTO-VIEW EFFECT ---
  // This logic is unchanged.
  useEffect(() => {
    if (storyText && contentRef.current) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    }
  }, [storyText]);

  // --- 5. ALL EVENT HANDLERS ARE UNCHANGED ---
  const handleClickableWordClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target || target.tagName !== 'SPAN' || !target.dataset.cleanWord) return;

    if (prefsLoading) {
      setToastMsg('Loading language preferences — please wait.');
      setToastOpen(true);
      return;
    }
    if (!preferences) {
      setToastMsg('Select your translation preferences first.');
      setToastOpen(true);
      return;
    }
    setSelectedWord(target.dataset.cleanWord);
    setAnchorEl(target);
  };

  const handleCloseTranslation = () => {
    setSelectedWord(null);
    setAnchorEl(null);
  };

  // --- 6. MANUAL RETRY HANDLER IS SIMPLIFIED ---
  // This is the component-specific logic for manual retry.
  const handleManualRetry = () => {
    setRetryKey((k) => k + 1);
  };

  const formattedText = storyText ? formatStoryText(storyText) : '';

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          {/* Title now correctly reflects the job status */}
          <IonTitle>
            {isLoading ? 'Loading...' : (status === 'failed' ? 'Failed' : (storyTitle || 'Story'))}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen ref={contentRef} className="ion-padding">
        {/* The IonAlert now uses the error state from our hook */}
        <IonAlert
          isOpen={!!error}
          header="Error"
          message={error ?? ''}
          buttons={[
            {
              text: 'Retry',
              handler: handleManualRetry, // The manual retry handler is wired up
            },
            { text: 'OK', role: 'cancel' },
          ]}
        />

        <IonToast
          isOpen={toastOpen}
          onDidDismiss={() => setToastOpen(false)}
          message={toastMsg}
          duration={2000}
        />
        <PageLayout>
          {/* --- 7. RENDER LOGIC IS CLEANER AND USES HOOK STATE --- */}
          {isLoading ? (
            <div className="ion-text-center ion-padding">
              <IonSpinner />
              <p>{status === 'pending' ? 'Generating your story...' : 'Loading your story...'}</p>
            </div>
          ) : status === 'success' && storyText ? (
            <>
              <div
                className={styles.storyContainer}
                onClick={handleClickableWordClick}
              >
                {generateClickableWords(formattedText)}
              </div>

              {selectedWord && anchorEl && preferences && (
                <FloatingPopup anchorEl={anchorEl} onClose={handleCloseTranslation}>
                  <Translation
                    word={selectedWord}
                    sourceLang={preferences.sourceLang}
                    targetLang={preferences.targetLang}
                    onClose={handleCloseTranslation}
                  />
                </FloatingPopup>
              )}
            </>
          ) : (
            <div className="ion-text-center ion-padding">
              <p>{error || 'No story available.'}</p>
              <IonButton onClick={handleManualRetry}>Retry</IonButton>
            </div>
          )}
          <Footer />
        </PageLayout>
      </IonContent>
    </IonPage>
  );
};

export default Reader;