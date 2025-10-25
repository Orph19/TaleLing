import React from 'react';
import MainIcon from '../../assets/mainicon(1).png';

// Import the corresponding CSS module for styling.
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerContent}>

        {/* =============================================
            BRAND IDENTITY
            Contains the app name and a thematic logo icon.
        ============================================== */}
        <div className={styles.footerBrand}>
          <img 
            src={MainIcon}
            alt="Taleling Logo" 
            className={styles.footerLogoIcon} // Reuse your existing styling class
          />
          <span className={styles.footerAppName}>Taleling</span>
        </div>

        {/* =============================================
            NAVIGATION
            Contains essential informational links.
        ============================================== */}
        <nav className={styles.footerNav}>
          <a href="/terms-of-use">Terms of Service</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact-support">Contact</a>
        </nav>
      </div>

      {/* =============================================
          COPYRIGHT
          Dynamically updated and centered.
      ============================================== */}
      <div className={styles.footerCopyright}>
        © {currentYear} Taleling. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;