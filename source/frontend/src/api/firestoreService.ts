import { db } from "../config/firebase";
import { doc, onSnapshot, FirestoreError } from "firebase/firestore";

/**
 * Listens to a Firestore document in real-time and invokes callbacks on changes or errors.
 * @param collectionName Firestore collection name.
 * @param docId Document ID to listen to.
 * @param onSuccess Callback when document data changes. Receives `null` if the document doesn't exist.
 * @param onError Optional callback for errors. If omitted, errors are logged.
 * @returns Function to unsubscribe the listener.
 */
export function listenToDocument<T = any>(
  collectionName: string,
  docId: string,
  onSuccess: (data: T | null) => void,
  onError?: (error: FirestoreError) => void
): () => void {
  const docRef = doc(db, collectionName, docId);

  const unsubscribe = onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        onSuccess(docSnap.data() as T);
      } else {
        console.warn(`Document ${collectionName}/${docId} does not exist or was deleted.`);
        onSuccess(null);
      }
    },
    (error) => {
      if (onError) {
        onError(error);
      } else {
        console.error(`Firestore listener error for ${collectionName}/${docId}:`, error);
      }
    }
  );

  return unsubscribe;
}
