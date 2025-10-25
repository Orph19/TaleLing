import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

/**
 * Defines the structure of the error object that will be stored in the context.
 * Using an object instead of a simple string allows for more structured error messages.
 */
interface AppError {
  header: string;
  message: string;
}

/**
 * Defines the shape of the context's value.
 * This includes the current error state and the functions to manipulate it.
 */
interface ErrorContextType {
  error: AppError | null;
  /**
   * Sets a new error to be displayed.
   * @param message The main error message to display.
   * @param header An optional, custom header for the error alert.
   */
  setError: (message: string, header?: string) => void;
  /**
   * Clears the current error, hiding any visible alerts.
   */
  clearError: () => void;
}

/**
 * React Context for global error state management.
 * Initialized with `undefined` to enforce provider usage.
 */
const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

/**
 * The ErrorProvider component is responsible for creating and managing the error state.
 * It should be placed high up in the component tree, typically wrapping the entire application in App.tsx.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the provider.
 */
export const ErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setErrorState] = useState<AppError | null>(null);

  const clearError = useCallback(() => {
    setErrorState(null);
  }, []);

  const setError = useCallback((message: string, header: string = 'Error') => {
    setErrorState({ header, message });
  }, []);

  /**
   * Memoize the context value to prevent unnecessary re-renders of consumer components
   * that rely on this context. The value object is only recreated if the state or functions change.
   */
  const contextValue = useMemo(() => ({
    error,
    setError,
    clearError,
  }), [error, setError, clearError]);

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

/**
 * Custom hook `useError` for easy consumption of the ErrorContext.
 * This hook abstracts away the `useContext` call and provides a check to ensure
 * it's used within a descendant of an `ErrorProvider`.
 *
 * @returns {ErrorContextType} The context value, including the error state and manipulator functions.
 * @throws {Error} If the hook is used outside of an ErrorProvider.
 */
export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (context === undefined) {
    throw new Error('useError must be used within an ErrorProvider');
  }
  return context;
};