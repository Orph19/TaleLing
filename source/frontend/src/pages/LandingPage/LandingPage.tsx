import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
} from '@ionic/react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

// --- Global Styles for the Landing Page ---
// We import the main CSS file that contains the root variables and background.
import styles from './LandingPage.module.css';

// --- Section Components ---
// Import all the cleanly refactored section components.
import HeroSection from './components/HeroSection/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import HowItWorksSection from './components/HowItWorksSection';
import FinalCTASection from './components/FinalCTASection';
import Footer from '../../components/Footer/Footer';

// --- Header Assets ---

const LandingPage: React.FC = () => {
    const { user } = useAuth();
    const history = useHistory();

    const handleGoogleSignIn = () => {
        history.push('/login'); 
    };

    useEffect(() => {
        if (user) {
            history.replace('/home');
        }
    }, [user, history]); 

  return (
    <IonPage>
      {/* =============================================
          PERSISTENT HEADER
          (Kept here as it's part of the Page, not a Section)
      ============================================== */}
      <IonHeader className={styles.header}>
        <IonToolbar className={styles.toolbar}>
          <IonTitle className={styles.appTitle}>Taleling</IonTitle>
          <IonButtons slot="end">
            {/* Desktop Button */}
            <IonButton
              fill="outline"
              className={`${styles.signInButtonHeader} ion-hide-md-down`}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </IonButton>
            {/* Mobile Button */}
            <IonButton 
              className={`${styles.signInButtonHeaderIcon} ion-hide-md-up`}
              onClick={handleGoogleSignIn}
            >
              <img src="/assets/google-logo.svg" alt="Sign in with Google" className={styles.googleIcon} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {/* This main container provides the animated background */}
        <div className={styles.landingContainer}>
          
          {/* === ASSEMBLE THE PAGE FROM ITS COMPONENTS === */}
          <HeroSection />
          <FeaturesSection />
          <HowItWorksSection />
          <FinalCTASection />

        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;