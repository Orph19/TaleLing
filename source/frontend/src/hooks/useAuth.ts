/**
 * @file useAuth Hook
 * @description A simple custom hook to provide easy access to the authentication context.
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * Custom hook for accessing the authentication state (user and loading status).
 * 
 * It ensures that the hook is only used within components that are children
 * of the AuthProvider, throwing an error otherwise. This is a best practice
 * that prevents common bugs.
 * 
 * @returns The authentication context value: { user: User | null, loading: boolean }.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};