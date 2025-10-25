// src/pages/ContactPage/ContactSupport.tsx
import React, { useEffect, FC } from 'react';
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
import PageLayout from '../../components/PageLayout/PageLayout';

const ContactSupportPage: FC = () => {
  useEffect(() => {
    const scriptId = 'tally-embed-script';
    if (document.getElementById(scriptId)) {
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = 'https://tally.so/widgets/embed.js';
    script.async = true;
    document.head.appendChild(script);
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Contact Support</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      {/* 
        --- THIS IS THE FIX ---
        The IonContent no longer needs fullscreen. The PageLayout will now manage the full height.
        The Footer is now INSIDE the PageLayout.
      */}
      <IonContent scrollY={false}>
        <PageLayout>
          {/* 
            This new wrapper div serves two purposes:
            1. `flex: 1`: It tells this container to grow and fill all available space,
               pushing the Footer (its sibling within PageLayout) to the bottom.
            2. `position: 'relative'`: It acts as a "containing block" for the absolutely
               positioned iframe, preventing it from covering the footer.
          */}
          <div style={{ flex: 1, position: 'relative' }}>
            <iframe
              data-tally-src="https://tally.so/r/wdrgDr"
              width="100%"
              height="100%"
              title="Contact support"
              sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: 'none',
              }}
            />
          </div>
          <Footer />
        </PageLayout>
      </IonContent>
    </IonPage>
  );
};

export default ContactSupportPage;