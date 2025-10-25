import React, { useState, useMemo } from 'react'; // Import useMemo for optimization
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Footer from '../../components/Footer/Footer';
import { useStories } from '../../hooks/useStories';
import { StoryList } from '../../components/StoryList/StoryList';
import { CreateStoryModal } from '../../components/CreateStoryModal/CreateStoryModal';
import * as storyService from '../../api/storyService';
import type { InitialStoryData, Story } from '../../types';
import { usePreferences } from '../../hooks/usePreferences';
import { useError } from '../../context/ErrorContext';
import PageLayout from '../../components/PageLayout/PageLayout';
import { StoryDetailsModal } from '../../components/StoryDetailsModal/StoryDetailsModal';

const Home: React.FC = () => {
  const history = useHistory();
  const { setError } = useError();

  // The `useStories` hook now provides a real-time, always-fresh list of stories.
  const { stories, isLoading } = useStories();
  const { preferences, loading: prefsLoading } = usePreferences();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // --- 1. STATE IS CHANGED TO HOLD ONLY THE ID ---
  // This prevents the component from holding onto a stale copy of the story object.
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  // The story creation logic remains unchanged.
  const handleCreateStory = async (data: InitialStoryData) => {
    if (prefsLoading || !preferences) {
      setError('User preferences are still loading. Please wait.', 'Preferences Not Ready');
      return;
    }
    setIsCreating(true);
    try {
      const requestId = crypto.randomUUID();
      await storyService.createNewStory({ 
        requestId, 
        selections: data,
        sourceLang: preferences.sourceLang,
        targetLang: preferences.targetLang
      });
      setIsCreateModalOpen(false);
      setSelectedStoryId(requestId);
    } catch (err: any) {
      console.error("Failed to create story:", err);
      setError(err.message || 'An unexpected error occurred.', 'Creation Failed');
      setIsCreateModalOpen(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleImageClick = (storyId: string) => {
    history.push(`/reader/${storyId}`);
  };

  /**
   * --- 2. HANDLER IS UPDATED TO STORE ONLY THE ID ---
   */
  const handleDetailsClick = (story: Story) => {
    if (story.id) {
      setSelectedStoryId(story.id);
    }
  };

  /**
   * --- 3. DERIVE THE FULL STORY OBJECT ON EVERY RENDER ---
   * This is the core of the fix. It finds the freshest version of the story from
   * the live `stories` array provided by the real-time hook.
   * `useMemo` is a performance optimization to prevent re-calculating unless necessary.
   */
  const selectedStory = useMemo(() => {
    if (!selectedStoryId || !stories) {
      return null;
    }
    return stories.find(story => story.id === selectedStoryId) || null;
  }, [stories, selectedStoryId]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Stories</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsCreateModalOpen(true)} className="ion-hide-md-down">
              <IonIcon slot="start" icon={add} />
              Read a New Story
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Stories</IonTitle>
          </IonToolbar>
        </IonHeader>
            
        <PageLayout>
           <StoryList
            isLoading={isLoading}
            // Pass an empty array if stories are null during the initial load.
            stories={stories || []}
            onImageClick={handleImageClick}
            onDetailsClick={handleDetailsClick}
          />
          <Footer />
        </PageLayout>
       
        <CreateStoryModal
          isOpen={isCreateModalOpen}
          isProcessing={isCreating}
          onClose={() => setIsCreateModalOpen(false)}
          onComplete={handleCreateStory}
        />

        {/* --- 4. MODAL NOW USES THE DERIVED STATE --- */}
        <StoryDetailsModal 
          story={selectedStory}
          // The modal's visibility is controlled by whether an ID is selected.
          isOpen={!!selectedStoryId}
          onClose={() => setSelectedStoryId(null)}
          onNavigateToReader={handleImageClick} // Pass the handler down
        />

        <IonFab 
          horizontal="end" 
          vertical="bottom" 
          slot="fixed" 
          className="ion-hide-md-up"
        >
          <IonFabButton onClick={() => setIsCreateModalOpen(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;