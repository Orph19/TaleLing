import React, { useState, useEffect } from 'react';
import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonSpinner
} from '@ionic/react';
import { tones, mapGenres, GenreKey, SubGenreKey } from '../../constants/genres';
import type { InitialStoryData } from '../../types';

/**
 * Props for the CreateStoryModal component.
 * This defines the "contract" for how the parent interacts with this modal.
 */
interface CreateStoryModalProps {
  isOpen: boolean;
  isProcessing: boolean;
  onClose: () => void;
  onComplete: (data: InitialStoryData) => void;
}

export const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, isProcessing, onClose, onComplete }) => {
  // Internal state to manage the multi-step process
  const [modalStep, setModalStep] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreKey | null>(null);
  const [selectedSubGenre, setSelectedSubGenre] = useState<SubGenreKey | null>(null);

  /**
   * Effect to reset the modal's internal state whenever it is closed.
   * This ensures it always opens back to the first step.
   */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => { // Use a timeout to allow the closing animation to finish
        setModalStep(1);
        setSelectedGenre(null);
        setSelectedSubGenre(null);
      }, 300);
    }
  }, [isOpen]);

  // --- Event Handlers ---

  const handleGenreSelect = (genre: GenreKey) => {
    setSelectedGenre(genre);
    setModalStep(2);
  };

  const handleSubGenreSelect = (subGenre: SubGenreKey) => {
    setSelectedSubGenre(subGenre);
    setModalStep(3);
  };

  const handleToneSelect = (tone: string) => {
    // The UI flow guarantees these values are not null at this point.
    // We call the onComplete prop passed down from the parent (Home.tsx).
    onComplete({
      genre: selectedGenre!,
      subGenre: selectedSubGenre!,
      tone: tone,
    });
  };
  
  const handleGoBack = () => {
    if (modalStep === 3) {
      setSelectedSubGenre(null);
      setModalStep(2);
    } else if (modalStep === 2) {
      setSelectedGenre(null);
      setModalStep(1);
    }
  };

  // --- Dynamic Content Rendering ---

  const getTitle = (): string => {
    switch (modalStep) {
      case 1: return "Select a Genre";
      case 2: return "Select a Subgenre";
      case 3: return "Select a Tone";
      default: return "Create Story";
    }
  };

  const renderStepContent = () => {
    switch (modalStep) {
      case 1:
        return (Object.keys(mapGenres) as GenreKey[]).map((genre) => (
          <IonButton expand="block" key={genre} onClick={() => handleGenreSelect(genre)}>
            {genre}
          </IonButton>
        ));
      
      case 2:
        if (!selectedGenre || !mapGenres[selectedGenre]) return null;
        return (
          <>
            {mapGenres[selectedGenre].map((subgenre: SubGenreKey) => (
              <IonButton expand="block" key={subgenre} onClick={() => handleSubGenreSelect(subgenre)}>
                {subgenre}
              </IonButton>
            ))}
          </>
        );

      case 3:
        return tones.map((tone: string) => (
          <IonButton expand="block" key={tone} onClick={() => handleToneSelect(tone)} disabled={isProcessing}>
            {isProcessing ? <IonSpinner name="dots" /> : tone}
          </IonButton>
        ));

      default:
        return null;
    }
  };

  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{getTitle()}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {renderStepContent()}

        {/* Back and Close buttons */}
        {modalStep > 1 && (
          <IonButton expand="block" color="medium" onClick={handleGoBack} disabled={isProcessing}>
            Back
          </IonButton>
        )}
        
        <IonButton expand="block" color="light" onClick={onClose} disabled={isProcessing}>
          Close
        </IonButton>
      </IonContent>
    </IonModal>
  );
};