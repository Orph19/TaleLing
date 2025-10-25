import React from 'react';
import { IonChip, IonLabel } from '@ionic/react';
import styles from './ImageStyleSelector.module.css';

/**
 * Defines the props for the ImageStyleSelector component.
 */
interface ImageStyleSelectorProps {
  /**
   * An array of strings representing the available style options.
   * e.g., ['Cinematic', 'Anime', 'Fantasy Art']
   */
  options: string[];
  /**
   * The currently selected style option.
   */
  selectedStyle: string;
  /**
   * A callback function that is invoked when a new style is selected.
   * @param style The newly selected style string.
   */
  onStyleSelect: (style: string) => void;
}

/**
 * A reusable UI component for selecting an image generation style from a list of options.
 * It renders a series of IonChips and highlights the currently selected one.
 * This component is "controlled," meaning the parent component must manage the state
 * of the `selectedStyle`.
 */
export const ImageStyleSelector: React.FC<ImageStyleSelectorProps> = ({
  options,
  selectedStyle,
  onStyleSelect,
}) => {
  return (
    <div className={styles.chipContainer}>
      {options.map((style) => (
        <IonChip
          key={style}
          outline={selectedStyle !== style} // Show as outline if not selected
          color="primary" // Use the primary theme color
          onClick={() => onStyleSelect(style)}
          className={styles.chip}
        >
          <IonLabel>{style}</IonLabel>
        </IonChip>
      ))}
    </div>
  );
};