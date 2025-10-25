import React from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton } from '@ionic/react';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  const history = useHistory();
  const goLogin = () => history.push('/login');

  return (
    <section className={styles.heroSection}>
      <div className={styles.heroWrapper}>

        {/* LEFT: Headline -> Subheading -> CTA (no visible box; extends toward animation) */}
        <div className={styles.leftCard}>
          <div className={styles.leftInner}>
            <h1 className={styles.headline}>
              The Fastest Way to Actually <em>Read</em> in Spanish
            </h1>

            <p className={styles.subheading}>
              Your brain is wired for stories, not flashcards. Immerse yourself and watch your vocabulary explode.
            </p>

            <IonButton className={styles.cta} shape="round" onClick={goLogin}>
              See For Yourself (It's Free)
            </IonButton>
          </div>
        </div>

        {/* RIGHT: Animation — text -> tap -> arrowed popup (loop) */}
        <div className={styles.visualWrap}>
          <div className={styles.visualFrame}>
            <div className={styles.animationStage}>

              <p className={styles.demoText}>
                Era medianoche, pero no había estrellas visibles desde{' '}
                <span className={styles.tappableWrapper}>
                  <span className={styles.tappable}>allí.</span>
                  <span className={styles.tapPulse} aria-hidden="true" />
                  <span className={styles.definitionCard}>
                    <strong>allí</strong>
                    <span className={styles.definitionText}>There or over there; far from the speaker and the listener</span>
                  </span>
                </span>{' '}
                 Solo datos. Filas de números se movían sin parar.
              </p>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
