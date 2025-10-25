import React, { useEffect } from 'react'; // --- Step 1: Import useEffect ---
import { useHistory } from 'react-router-dom'; // --- Step 2: Import useHistory ---
import {
  IonPage,
  IonContent,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { logoGoogle } from 'ionicons/icons';
import { useAuth } from '../../hooks/useAuth';
import Footer from '../../components/Footer/Footer';

const Login: React.FC = () => {
  // --- Step 3: Get the user object and the history instance ---
  const { user, signInWithGoogle } = useAuth();
  const history = useHistory();

  // --- Step 4: Add the redirection logic ---
  // This useEffect hook will run whenever the 'user' or 'history' object changes.
  useEffect(() => {
    // If a user object exists (meaning the user is logged in),
    // we should not be on the login page.
    if (user) {
      // We use history.replace instead of history.push.
      // 'replace' swaps the current URL (/login) with the new one (/home)
      // in the browser's history, so the user can't click the "back"
      // button to get back to the login page. This is a crucial UX detail.
      history.replace('/home');
    }
  }, [user, history]); // The effect depends on these values


  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      // After this is called, the 'user' object in our useEffect will
      // change from null to a user, triggering the redirection.
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // The JSX part of the component does not need to change at all.
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <IonGrid style={{ height: '100%' }}>
          <IonRow
            className="ion-justify-content-center ion-align-items-center"
            style={{ height: '100%' }}
          >
            <IonCol size="12" size-md="6" size-lg="4" className="ion-text-center">
              <IonText>
                <h1>Taleling</h1>
              </IonText>
              <IonText color="medium">
                <p>Please sign in to start your journey</p>
              </IonText>

              <IonButton
                expand="block"
                onClick={handleLogin}
                className="ion-margin-top"
              >
                <IonIcon slot="start" icon={logoGoogle} />
                Sign in with Google
              </IonButton>

            </IonCol>
          </IonRow>
        </IonGrid>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Login;