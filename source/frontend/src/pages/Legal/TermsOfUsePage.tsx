// src/pages/TermsOfUsePage.tsx

import React from 'react';
import LegalContentPage from '../../components/Legal/LegalContentPage';
import { termsOfUseHtml } from '../../data/legalContent';
const TermsOfUsePage: React.FC = () => {
  return (
    <LegalContentPage
      pageTitle="Terms of Use"
      htmlContent={termsOfUseHtml}
    />
  );
};

export default TermsOfUsePage;