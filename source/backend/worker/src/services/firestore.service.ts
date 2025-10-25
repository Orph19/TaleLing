/**
 * @file Firestore Service
 * @description This module encapsulates all interactions with the Google Firestore REST API.
 *              It handles fetching, creating, updating, and querying story documents.
 */

import { toFirestoreValue, parseFirestoreDocument } from '../utils/helpers';
import type { FirebaseConfig, Story, StoryUpdatePayload } from '../utils/types';


/**
 * Fetches a list of all stories belonging to a specific user.
 * @param config - The Firebase configuration object.
 * @param idToken - The user's Firebase Auth ID token.
 * @param uid - The user ID to query stories for.
 * @returns {Promise<Story[]>} A list of the user's stories.
 */
export async function fetchStoryList(config: FirebaseConfig, idToken: string, uid: string): Promise<Story[]> {
  const url = `https://firestore.googleapis.com/v1beta1/projects/${config.projectId}/databases/(default)/documents:runQuery?key=${config.firebaseApiKey}`;
  
  if (!uid) throw new Error('No UID from token');
  
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${idToken}` },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: config.collectionId }],
        where: {
          fieldFilter: {
            field: { fieldPath: 'uid' },
            op: 'EQUAL',
            value: { stringValue: uid }
          }
        },
        orderBy: [{
            field: { fieldPath: 'createdAt' },
            direction: 'DESCENDING'
        }]
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Detailed Firestore Query Error:", JSON.stringify(errorData, null, 2)); 
    throw new Error(errorData.error?.message || 'Failed to query stories from Firestore.');
  }

  const results = await response.json();
  if (!results || !Array.isArray(results) || !results[0]?.document) {
    return []; // Return an empty array if no documents are found
  }
  
  // Map over the array of document responses
  const stories = results.map(res => {
    const doc = res.document;
    const docPath = doc.name.split('/');
    const docId = docPath[docPath.length - 1];
    
    // Parse the fields and add the document ID
    const parsedStory: Story = { ...parseFirestoreDocument(doc), id: docId };

    return parsedStory;
  });

  return stories;
}
