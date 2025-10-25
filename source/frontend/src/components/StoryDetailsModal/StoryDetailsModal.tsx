import React from 'react';
import { IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon } from '@ionic/react';
import { close } from 'ionicons/icons';
import type { Story } from '../../types';
import { StoryDetailsView } from '../StoryDetailsView/StoryDetailsView';

interface StoryDetailsModalProps {
  /**
   * The story object to be displayed. If null, the modal will not render its content.
   */
  story: Story | null;
  /**
   * Controls whether the modal is currently visible.
   */
  isOpen: boolean;
  /**
   * A callback function invoked when the user requests to close the modal.
   */
  onClose: () => void;
  onNavigateToReader: (storyId: string) => void;
}

/**
 * A modal component for displaying detailed information about a story.
 * It acts as a container, wrapping the reusable `StoryDetailsView` component
 * with the necessary modal chrome (header, close button, etc.).
 */
export const StoryDetailsModal: React.FC<StoryDetailsModalProps> = ({ story, isOpen, onClose, onNavigateToReader }) => {
  return (
    <IonModal isOpen={isOpen} onDidDismiss={onClose}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{story?.content?.title || 'Story Details'}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onClose}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      
      {story ? (
        // --- CHANGE: Pass the new prop down to the StoryDetailsView.
        <StoryDetailsView 
          story={story} 
          onNavigateToReader={onNavigateToReader} 
        />
      ) : null}
    </IonModal>
  );
};