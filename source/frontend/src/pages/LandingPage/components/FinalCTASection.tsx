import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonButton,
  IonIcon,
} from '@ionic/react';
import { leafOutline, sparklesOutline } from 'ionicons/icons';

// Import this component's dedicated CSS module
import styles from './FinalCTASection.module.css';

const FinalCTASection: React.FC = () => {
  const history = useHistory();

  const handleNavigateToLogin = () => {
    history.push('/login');
  };

  return (
        
    <section className={styles.finalCtaSection}>
      <h2>Stop Studying. Start Binge-Reading.</h2>
      <IonButton
        size="large"
        shape="round"
        className={styles.finalCtaButton}
        onClick={handleNavigateToLogin}
      >
        Unleash My First Story
        <IonIcon slot="end" icon={sparklesOutline} /> {/* Suggested icon change */}
      </IonButton>
    </section>

  );
};

export default FinalCTASection;