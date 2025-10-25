// src/components/StoryList/StoryList.tsx
import React from 'react';
import { IonText } from '@ionic/react'; // IonSpinner is no longer needed
import type { Story } from '../../types';
import { StoryCard } from '../StoryCard/StoryCard';
import { SkeletonStoryCard } from '../SkeletonStoryCard/SkeletonStoryCard'; // --- CHANGE: Import the new skeleton component
import styles from './StoryList.module.css';

interface StoryListProps {
  stories: Story[];
  isLoading: boolean;
  onImageClick: (storyId: string) => void;
  onDetailsClick: (story: Story) => void;
}

export const StoryList: React.FC<StoryListProps> = ({ 
  stories, 
  isLoading, 
  onImageClick, 
  onDetailsClick 
}) => {
  // --- THIS IS THE FIX ---
  // The isLoading state now renders a grid of skeleton placeholders.
  if (isLoading) {
    // Create a dummy array to map over. The length determines how many skeletons to show.
    const skeletonCount = Array.from({ length: 8 }); 
    
    return (
      <div className={styles.storyGrid}>
        {skeletonCount.map((_, index) => (
          <SkeletonStoryCard key={index} />
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="ion-text-center ion-padding">
        <IonText>
          <p>No stories found.</p>
          <p>Tap the '+' button to create one!</p>
        </IonText>
      </div>
    );
  }

  return (
    <div className={styles.storyGrid}>
      {stories.map((story) => (
        <StoryCard
          key={story.id}
          story={story}
          onImageClick={onImageClick}
          onDetailsClick={onDetailsClick}
        />
      ))}
    </div>
  );
};