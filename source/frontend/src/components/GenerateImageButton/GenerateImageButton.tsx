import React from 'react';
import { IonButton, IonSpinner, IonIcon } from '@ionic/react';
import { imageOutline } from 'ionicons/icons';

/**
 * Defines the props for the now "dumb" GenerateImageButton component.
 */
interface GenerateImageButtonProps {
  /** A boolean passed from the parent to indicate if the button should show a loading state. */
  isGenerating: boolean;
  /** The callback function to execute when the button is clicked. */
  onClick: () => void;
}

/**
 * A simple, presentational button for triggering image generation.
 *
 * It is now a "dumb" component that receives its state (`isGenerating`) and
 * its behavior (`onClick`) via props. This decouples it completely from any

 * data-fetching logic, making it highly reusable.
 */
export const GenerateImageButton: React.FC<GenerateImageButtonProps> = ({ isGenerating, onClick }) => {
  return (
    <IonButton
      expand="block"
      onClick={onClick}
      disabled={isGenerating}
    >
      {isGenerating ? (
        <IonSpinner name="crescent" />
      ) : (
        <>
          <IonIcon slot="start" icon={imageOutline} />
          Generate Image
        </>
      )}
    </IonButton>
  );
};