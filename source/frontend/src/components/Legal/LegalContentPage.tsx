// src/components/LegalContentPage.tsx

import React from 'react';
import {
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
} from '@ionic/react';
import Footer from '../../components/Footer/Footer';
interface LegalContentPageProps {
  pageTitle: string;
  htmlContent: string;
}

const LegalContentPage: React.FC<LegalContentPageProps> = ({ pageTitle, htmlContent }) => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} scrollY={false}>
        <iframe
          title={pageTitle}
          srcDoc={htmlContent}
          sandbox="allow-scripts allow-same-origin"
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
        />
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default LegalContentPage;