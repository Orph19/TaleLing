// src/components/StoryCard/StoryCard.tsx
import React from 'react';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/react';
import type { Story } from '../../types';
import { StoryImage } from '../StoryImage/StoryImage';
import styles from './StoryCard.module.css';

interface StoryCardProps {
  story: Story;
  onImageClick: (storyId: string) => void;
  onDetailsClick: (story: Story) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, onImageClick, onDetailsClick }) => {
  const storyId = story.id;
  if (!storyId) {
    console.warn("StoryCard rendered without a story ID.", { story });
    return null;
  }

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageClick(storyId);
  };

  const handleDetailsClick = () => {
    onDetailsClick(story);
  };

  return (
    <IonCard className={styles.card}>
      <div onClick={handleImageClick} className={styles.imageContainer}>
        <StoryImage
          imageUrl={story.coverImageUrl}
          title={story.content?.title || 'Untitled'}
        />
      </div>

      <div onClick={handleDetailsClick} className={styles.detailsContainer}>
        <IonCardHeader>
          <IonCardTitle className={styles.cardTitle}>
            {story.content?.title || 'Untitled Story'}
          </IonCardTitle>
          {/* --- THIS IS THE FIX --- */}
          {/* The genre and subGenre are now both displayed. */}
          <IonCardSubtitle className={styles.cardGenre}>
            {story.selections?.genre || 'No Genre'}
          </IonCardSubtitle>
          <IonCardSubtitle className={styles.cardSubGenre}>
            {story.selections?.subGenre || ''}
          </IonCardSubtitle>
        </IonCardHeader>
      </div>
    </IonCard>
  );
};