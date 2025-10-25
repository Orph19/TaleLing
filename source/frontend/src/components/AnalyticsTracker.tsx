// src/components/AnalyticsTracker.tsx

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Declare gtag on the window object for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config',
      targetId: string,
      config?: { [key: string]: any }
    ) => void;
  }
}

const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is available
    if (window.gtag) {
      // Send a page_view event
      window.gtag('config', 'G-2R78273EFZ', {
        'page_path': location.pathname + location.search,
      });
    }
  }, [location]); // Re-run this effect every time the location changes

  return null; // This component does not render anything
};

export default AnalyticsTracker;