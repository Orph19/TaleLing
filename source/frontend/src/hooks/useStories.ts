import { useMemo } from 'react';
import { collection, query, where, orderBy, Query } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from './useAuth'; // Assuming you have a hook that provides the current user
import { useFirestoreQuery } from './useFirestoreQuery';
import type { Story } from '../types';

/**
 * Defines the return structure for the useStories hook.
 */
interface StoriesState {
  /** The real-time array of the user's stories. Null on initial load, empty array if none exist. */
  stories: Story[] | null;
  /** True while the initial list of stories is being fetched. */
  isLoading: boolean;
  /** Any FirestoreError that occurred during the query. */
  error: Error | null;
}

/**
 * A declarative hook for fetching the current user's stories in real-time.
 *
 * This hook is responsible for constructing the correct Firestore query for the
 * user's stories. It then delegates the actual data fetching and real-time
 * listening to the generic `useFirestoreQuery` hook. This separation of concerns
 * keeps the component-specific logic clean and easy to understand.
 *
 * @returns {StoriesState} An object containing the user's stories, loading state, and error state.
 */
export function useStories(): StoriesState {
  const { user } = useAuth(); // Get the current authenticated user.

  // useMemo is crucial here. It ensures that the Query object is only recreated
  // when the user's UID changes. This prevents the `useFirestoreQuery` hook
  // from re-subscribing on every render, which is a critical performance optimization.
  const storiesQuery = useMemo(() => {
    // If there is no user, we should not attempt to query.
    // The `useFirestoreQuery` hook will handle this null value gracefully.
    if (!user) {
      return null;
    }

    // Construct the specific query to get all stories for the current user,
    // ordered by creation date with the newest first.
    return query(
      collection(db, 'stories'),
      where("uid", "==", user.uid),
      where("status", "!=", "failed"), // This line filters out the failed stories.
      orderBy("createdAt", "desc")
    ) as Query<Story>; // Cast the query to the expected return type for type safety.

  }, [user]); // The dependency array ensures this only runs when the user object changes.

  // Delegate all the complex listener logic to our reusable hook.
  const { data: stories, loading, error } = useFirestoreQuery<Story>(storiesQuery);

  // Return the data in the specific shape expected by the UI components.
  return {
    stories,
    isLoading: loading,
    error,
  };
}