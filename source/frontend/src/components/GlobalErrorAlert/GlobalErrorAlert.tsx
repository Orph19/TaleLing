import React from 'react';
import { IonAlert } from '@ionic/react';
import { useError } from '../../context/ErrorContext';

/**
 * A global component that renders an IonAlert whenever an error is set in the ErrorContext.
 * This component should be rendered once at the top level of the application (e.g., in App.tsx)
 * to act as the single source of truth for displaying critical errors to the user.
 *
 * It has no props and derives its entire state from the `useError` hook.
 */
export const GlobalErrorAlert: React.FC = () => {
  const { error, clearError } = useError();

  /**
   * `onDidDismiss` is a crucial handler. It ensures that when the user closes the alert
   * (either by clicking a button or the backdrop), the error state is cleared.
   * This prevents the alert from being stuck in a visible state.
   */
  const handleDismiss = () => {
    clearError();
  };

  return (
    <IonAlert
      isOpen={!!error} // Coerces the error object or null into a boolean.
      header={error?.header || 'An Error Occurred'} // Provides a sensible default header.
      message={error?.message}
      buttons={['OK']}
      onDidDismiss={handleDismiss}
      // data-testid is useful for integration and end-to-end tests.
      data-testid="global-error-alert"
    />
  );
};