import React, { useState } from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';

// Import this component's dedicated CSS module
import styles from './HowItWorksSection.module.css';
// Assuming the new, smarter OptimizedImage component is imported correctly
import OptimizedImage from './OptimizedImage';

// The content remains in a clean array
const steps = [
  {
    title: 'Choose Your Adventure',
    description: 'Forget prompts. Just choose your favorite genre and tone. Our AI acts as your personal author, instantly crafting a story you\'re guaranteed to love.',
    imageSrc: '/assets/generate.jpg',
  },
  {
    title: 'Unleash Your Story',
    description: 'In seconds, a never-before-seen story appears, written just for you. Get lost in a narrative designed to hold your attention from the first word to the last.',
    imageSrc: '/assets/your-story.jpg',
  },
  {
    title: 'Learn at the Speed of Reading',
    description: 'Tap any word for an instant translation and definition—without breaking your flow. This in-context learning is the fastest way to make new vocabulary stick.',
    imageSrc: '/assets/vocab.jpg',
  },
  {
    title: 'Visualize the World',
    description: 'One click is all it takes. Generate a stunning, AI-powered illustration that matches the mood of your story, bringing the entire world off the page.',
    imageSrc: '/assets/imagine.jpg',
  }
];

const HowItWorksSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState(0);

  const handleMobileToggle = (index: number) => {
    setMobileOpenIndex(mobileOpenIndex === index ? -1 : index);
  };

  return (
    <section className={styles.howItWorksSection}>
      <h2 className={styles.sectionTitle}>It's As Simple As This</h2>
      
      {/* =================================================================
          DESKTOP LAYOUT
      ================================================================= */}
      <div className={styles.desktopLayout}>
        <IonGrid>
          <IonRow className="ion-align-items-start">

            {/* === LEFT SIDE: Titles only === */}
            <IonCol size="12" size-lg="5" className={styles.stepList}>
              {steps.map((step, index) => (
                <button 
                  key={index}
                  className={`${styles.stepItem} ${index === activeIndex ? styles.active : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={styles.stepNumber}>{`0${index + 1}`}</span>
                  <span className={styles.stepTitle}>{step.title}</span>
                </button>
              ))}
            </IonCol>

            {/* === RIGHT SIDE: Image and Description Viewer === */}
            <IonCol size="12" size-lg="7" className={styles.viewerContainer}>
              <div className={styles.descriptionFrame}>
                {steps.map((step, index) => (
                  <p key={index} className={index === activeIndex ? styles.visible : ''}>
                    {step.description}
                  </p>
                ))}
              </div>
              <div className={styles.imageFrame}>
                {steps.map((step, index) => (
                  <div key={index} className={`${styles.stepImageWrapper} ${index === activeIndex ? styles.visible : ''}`}>
                    {/* UPDATED: Passing the full, original src path directly */}
                    <OptimizedImage
                      src={step.imageSrc}
                      alt={step.title}
                    />
                  </div>
                ))}
              </div>
            </IonCol>

          </IonRow>
        </IonGrid>
      </div>

      {/* =================================================================
          MOBILE LAYOUT - "Accordion"
      ================================================================= */}
      <div className={styles.mobileLayout}>
        {steps.map((step, index) => (
          <div key={index} className={`${styles.mobileStep} ${mobileOpenIndex === index ? styles.open : ''}`}>
            <button className={styles.mobileStepHeader} onClick={() => handleMobileToggle(index)}>
              <span className={styles.stepTitle}>{step.title}</span>
              <span className={styles.plusIcon}></span>
            </button>
            <div className={styles.mobileStepContent}>
              <div className={styles.mobileImageWrapper}>
                {/* UPDATED: Passing the full, original src path directly */}
                <OptimizedImage src={step.imageSrc} alt={step.title} />
              </div>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default HowItWorksSection;