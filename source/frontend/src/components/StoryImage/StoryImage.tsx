import React from 'react';
import { IonImg } from '@ionic/react';
import styles from './StoryImage.module.css';

/**
 * A utility function to generate initials from a title string.
 * - "The Lord of the Rings" -> "TL"
 * - "Dune" -> "DU"
 * - "" -> "?"
 * @param {string} title The title of the story.
 * @returns {string} The calculated initials, always in uppercase.
 */
const getInitials = (title: string): string => {
  const cleanedTitle = title.trim();
  if (!cleanedTitle) return '?';

  const words = cleanedTitle.split(/\s+/);
  
  if (words.length > 1) {
    // Take the first letter of the first two words.
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  
  // If there's only one word, take the first two letters of that word.
  return cleanedTitle.substring(0, 2).toUpperCase();
};

/**
 * Defines the props for the StoryImage component.
 */
interface StoryImageProps {
  /** The public URL of the story's cover image. If null or undefined, a placeholder will be rendered. */
  imageUrl?: string | null;
  /** The title of the story. Used as alt text for the image and to generate initials for the placeholder. */
  title: string;
}

/**
 * A specialized, reusable component for displaying a story's cover image.
 *
 * It implements a critical piece of UI logic:
 * - If an `imageUrl` is provided, it renders the image using Ionic's lazy-loading `IonImg`.
 * - If no `imageUrl` is provided, it renders a styled, CSS-based placeholder
 *   containing the initials of the story's title.
 *
 * This ensures a consistent and professional look for all story visuals.
 */
export const StoryImage: React.FC<StoryImageProps> = ({ imageUrl, title }) => {
  if (imageUrl) {
    // --- RENDER THE REAL IMAGE ---
    return (
      <IonImg
        src={imageUrl}
        alt={`Cover for ${title}`}
        className={styles.image}
        // data-testid is useful for end-to-end testing frameworks.
        data-testid="story-image-real"
      />
    );
  } else {
    // --- RENDER THE PLACEHOLDER ---
    const initials = getInitials(title);
    return (
      <div className={styles.placeholder} data-testid="story-image-placeholder">
        <span className={styles.initials}>{initials}</span>
      </div>
    );
  }
};