import React from 'react';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
} from '@ionic/react';
import { createOutline, schoolOutline } from 'ionicons/icons';

// Import this component's dedicated CSS module
import styles from './FeaturesSection.module.css';

const FeaturesSection: React.FC = () => {
  return (
    <section className={styles.featuresSection}>
      <h2 className={styles.sectionTitle}>Read, Don't Study. Here's How.</h2>
      <IonGrid>
        <IonRow>
          
          {/* === FEATURE 1: AI-Crafted Stories === */}
          <IonCol size="12" size-md="6" className={styles.feature}>
            <IonIcon icon={createOutline} className={styles.featureIcon} />
            <h3>Your Personal Story Generator</h3>
            <p>
              Choose your favorite genre, and our AI instantly writes a unique story for you in Spanish or English. Forget boring textbooks—this is fresh, addictive fiction you’ll actually want to read.
            </p>
          </IonCol>

          {/* === FEATURE 2: Intuitive Vocabulary Learning === */}
          <IonCol size="12" size-md="6" className={styles.feature}>
            <IonIcon icon={schoolOutline} className={styles.featureIcon} />
            <h3>Never Get Stuck</h3>
            <p>
              Stuck on a word? Just tap it. Instantly see the translation and meaning without ever leaving the story. Your brain absorbs vocabulary in context, making it stick far better than any flashcard.
            </p>
          </IonCol>
          
        </IonRow>
      </IonGrid>
    </section>
  );
};

export default FeaturesSection;