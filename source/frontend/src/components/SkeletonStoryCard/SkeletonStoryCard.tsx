// src/components/SkeletonStoryCard/SkeletonStoryCard.tsx
import React from 'react';
import styles from './SkeletonStoryCard.module.css';

/**
 * A presentational component that renders a skeleton/placeholder version of a StoryCard.
 * It mimics the exact dimensions and layout of a real StoryCard to prevent layout shift
 * when the actual content loads.
 */
export const SkeletonStoryCard: React.FC = () => {
  return (
    <div className={styles.card}>
      <div className={`${styles.imageContainer} ${styles.skeleton}`} />
      <div className={styles.detailsContainer}>
        <div className={`${styles.title} ${styles.skeleton}`} />
        <div className={`${styles.subtitle} ${styles.skeleton}`} />
      </div>
    </div>
  );
};