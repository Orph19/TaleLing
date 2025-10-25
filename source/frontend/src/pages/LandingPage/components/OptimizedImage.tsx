import React, { useState } from 'react';
import styles from './OptimizedImage.module.css';

interface OptimizedImageProps {
  src: string; // The FULL path to the original image, e.g., "/assets/generate.jpg"
  alt: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // --- CORRECTED PATH LOGIC (JPG ONLY) ---
  // This logic is robust and correctly finds your placeholder.
  // Example: src = "/assets/generate.jpg"
  
  // 1. Get the base file name without the extension (e.g., "generate")
  const baseName = src.substring(src.lastIndexOf('/') + 1, src.lastIndexOf('.'));

  // 2. Construct the placeholder path (e.g., "/assets/placeholders/generate.placeholder.jpg")
  const placeholderSrc = `/assets/placeholders/${baseName}.placeholder.jpg`;

  return (
    <div className={styles.imageWrapper}>
      {/* 
        The tiny, blurry placeholder image.
        This loads instantly from your placeholders directory.
      */}
      <img
        src={placeholderSrc}
        alt="" // Alt text is on the main image, this is decorative
        aria-hidden="true"
        className={styles.imagePlaceholder}
      />

      {/* 
        The full-quality JPG image.
        It's initially invisible and fades in only after it finishes loading.
        The <picture> and <source> tags have been removed for simplicity.
      */}
      <img
        src={src} // Uses the original, full src path directly (e.g., "/assets/generate.jpg")
        alt={alt}
        className={`${styles.fullImage} ${isLoaded ? styles.loaded : ''}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

export default OptimizedImage;