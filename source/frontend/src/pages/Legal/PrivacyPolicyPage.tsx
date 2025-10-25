// src/pages/PrivacyPolicyPage.tsx

import React from 'react';
import LegalContentPage from '../../components/Legal/LegalContentPage';
import { privacyPolicyHtml } from '../../data/legalContent';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <LegalContentPage
      pageTitle="Privacy Policy"
      htmlContent={privacyPolicyHtml}
    />
  );
};

export default PrivacyPolicyPage;