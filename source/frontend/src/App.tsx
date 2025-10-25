import React from 'react';
// --- Step 1: Import Switch for better route handling ---
import { Redirect, Route, Switch } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import '@ionic/react/css/core.css';

// --- Step 2: Import our new pages and components ---
import { AuthProvider } from './context/AuthContext';
import { PreferencesProvider } from './context/PreferencesContext'; // ← import

import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'; // The Gatekeeper
import { PreferencesGate } from './components/Preferences/PreferencesGate'
import { ErrorProvider } from './context/ErrorContext';
import { GlobalErrorAlert } from './components/GlobalErrorAlert/GlobalErrorAlert';
import AnalyticsTracker from './components/AnalyticsTracker';

import Home from './pages/HomePage/Home';
import Reader from './pages/ReaderPage/Reader';
import Login from './pages/LoginPage/Login'; // The Front Door
import ContactSupport from './pages/ContactPage/ContactSupport'; 
import LandingPage from './pages/LandingPage/LandingPage'
import PrivacyPolicyPage from './pages/Legal/PrivacyPolicyPage';
import TermsOfUsePage from './pages/Legal/TermsOfUsePage';
/* Core CSS... */
import '@ionic/react/css/core.css';
/* Basic CSS... */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS... */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';

setupIonicReact();

/**
 * --- Step 3: Refactor AppRouter to handle public and private routes ---
 * This component's logic is now much simpler. It just defines the routes
 * and lets ProtectedRoute handle the complex auth logic.
 */
const AppRouter: React.FC = () => {
  // We no longer need the 'loading' check here. ProtectedRoute handles it.
  return (
    <IonReactRouter>
      <AnalyticsTracker />
      <IonRouterOutlet>
        {/* Switch ensures that only the FIRST matching route is rendered. */}
        <Switch>
          {/* --- Public Route --- */}
          {/* This route is NOT wrapped. Anyone can access it. */}
          <Route exact path="/login" component={Login} />

          {/* --- Protected Routes --- */}
          {/* To protect a route, we wrap its component in our <ProtectedRoute>. */}
          <Route exact path="/home">
            <ProtectedRoute>
              <PreferencesGate>
                <Home />
              </PreferencesGate>
            </ProtectedRoute>
          </Route>
          
          <Route exact path="/reader/:id">
            <ProtectedRoute>
              <PreferencesGate>
                <Reader />
              </PreferencesGate>
            </ProtectedRoute>
          </Route>

          <Route exact path="/contact-support">
            <ProtectedRoute>
              <ContactSupport />
            </ProtectedRoute>
          </Route>
          <Route exact path="/privacy" component={PrivacyPolicyPage} />
          <Route exact path="/terms-of-use" component={TermsOfUsePage} />

          {/* --- Default Redirect --- */}
          {/* This still redirects to /home, but now ProtectedRoute will catch it
              if the user is not logged in and send them to /login. */}
          <Route exact path="/">
            <LandingPage />
          </Route>
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};


/**
 * The main App component. This structure is perfect and does not need to change.
 * It correctly sets up the AuthProvider at the highest level.
 */
const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <ErrorProvider>
      <GlobalErrorAlert />
        <PreferencesProvider>
          <AppRouter />
        </PreferencesProvider>
      </ErrorProvider>
    </AuthProvider>
  </IonApp>
);

export default App;