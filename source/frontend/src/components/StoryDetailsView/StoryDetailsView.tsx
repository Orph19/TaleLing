// src/components/StoryDetailsView/StoryDetailsView.tsx
import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { IonContent, IonText, IonSpinner } from '@ionic/react';
import type { Story } from '../../types';
import { StoryImage } from '../StoryImage/StoryImage';
import { GenerateImageButton } from '../GenerateImageButton/GenerateImageButton';
import { ImageStyleSelector } from '../ImageStyleSelector/ImageStyleSelector';
import { useAsyncJobTrigger } from '../../hooks/useAsyncJobTrigger';
import { useFirestoreDocument } from '../../hooks/useFirestoreDocument';
import { JOB_CONFIG } from '../../config/jobConfig';
import * as imageService from '../../api/imageService';
import styles from './StoryDetailsView.module.css';

const IMAGE_STYLE_OPTIONS = ['Cinematic', 'Anime', 'Fantasy Art', 'Watercolor'];

interface StoryDetailsViewProps {
  story: Story;
   onNavigateToReader: (storyId: string) => void; // --- CHANGE: Add this prop
}

export const StoryDetailsView: React.FC<StoryDetailsViewProps> = ({ story, onNavigateToReader}) => {
  const { data: liveStory, loading: isStoryLoading, error: storyError } = useFirestoreDocument<Story>('stories', story.id);
  const [selectedStyle, setSelectedStyle] = useState<string>(IMAGE_STYLE_OPTIONS[0]);

  // A new handler for the image click
  const handleReadClick = () => {
    if (story.id) {
      onNavigateToReader(story.id);
    }
  };

  const imageJobFilters = useMemo(() => ({
    storyId: story.id,
    subType: 'cover'
  }), [story.id]);

  const { data: newlyGeneratedUrl, isChecking, isJobRunning, checkStatus, createJob } = useAsyncJobTrigger<string>({
    collectionName: 'images',
    filters: imageJobFilters,
    createJobApiFunction: (params) => imageService.generateStoryImage({ ...params, style: selectedStyle }),
    staleThresholdMs: JOB_CONFIG.image.staleThresholdMs,
  });
  
  useEffect(() => {
    if (liveStory && !liveStory.coverImageUrl && liveStory.status === 'completed') {
      checkStatus();
    }
  }, [liveStory, checkStatus]);

  const displayUrl = newlyGeneratedUrl || liveStory?.coverImageUrl;

  const handleGenerateClick = () => {
    createJob();
  };

  if (isStoryLoading) {
    return <div className={styles.centeredMessage}><IonSpinner name="crescent" /></div>;
  }
  if (storyError) {
    return <div className={styles.centeredMessage}><IonText color="danger"><p>Error loading story details.</p></IonText></div>;
  }
  if (!liveStory) {
    return <div className={styles.centeredMessage}><IonText color="medium"><p>Story not found.</p></IonText></div>;
  }

  const showGenerationTools = liveStory.status === 'completed' 
    && !!liveStory.content 
    && !displayUrl;

  const title = liveStory.content?.title || 'Story is Generating...';
  const description = liveStory.content?.description || 'The story text is being created by our AI.';
  const genre = liveStory.selections?.genre || '...';
  const tone = liveStory.selections?.tone || '...';

  return (
    <IonContent className="ion-padding">
      {/* --- THIS IS THE FIX --- */}
      {/* The image container is now a clickable element that triggers the read action. */}
      <div 
        className={styles.imageContainer} 
        onClick={handleReadClick}
        style={{ cursor: 'pointer' }} // Add cursor to indicate it's clickable
      >
        <StoryImage imageUrl={displayUrl} title={title} />
      </div>

      <div className={styles.contentBlock}>
        <IonText>
          <h3>{title}</h3>
          <p><strong>Genre:</strong> {genre} | <strong>Tone:</strong> {tone}</p>
          <p className={styles.description}>{description}</p>
        </IonText>
      </div>
      
      {showGenerationTools && story.id && (
        <div className={styles.generationSection}>
          <IonText color="medium"><p className="ion-text-center">Select a style to generate a cover image.</p></IonText>
          <ImageStyleSelector
            options={IMAGE_STYLE_OPTIONS}
            selectedStyle={selectedStyle}
            onStyleSelect={setSelectedStyle}
          />
          <GenerateImageButton 
            isGenerating={isChecking || isJobRunning} 
            onClick={handleGenerateClick} 
          />
        </div>
      )}
    </IonContent>
  );
};

export default StoryDetailsView;