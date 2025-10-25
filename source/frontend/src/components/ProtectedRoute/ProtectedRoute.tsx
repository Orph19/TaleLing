import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <div className="ion-text-center ion-padding" style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <IonSpinner />
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!user) {
    return <Redirect to="/login" />;
  }

  // The "happy path" logic is exactly the same.
  return <>{children}</>;
};