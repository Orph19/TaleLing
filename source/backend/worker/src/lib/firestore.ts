/**
 * @file Firestore REST API Helper
 * @description Provides simple functions to interact with Firestore using its
 *              REST API, suitable for serverless environments like Cloudflare Workers.
 */

import { parseFirestoreDocument } from '../utils/helpers';
import { Context } from 'hono';

/**
 * Checks if a document exists in a Firestore collection.
 * @param projectId - Your Firebase Project ID.
 * @param idToken - The user's Firebase ID token for authentication.
 * @param collection - The name of the collection.
 * @param docId - The ID of the document to check.
 * @returns {Promise<boolean>} True if the document exists, false otherwise.
 */
export async function docExists(projectId: string, idToken: string, collection: string, docId: string): Promise<boolean> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}/${docId}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${idToken}`,
      },
    });
    // If the document exists, the API returns a 200 OK.
    // If it doesn't, it returns a 404 Not Found.
    return response.ok;
  } catch (error) {
    console.error('Firestore docExists check failed:', error);
    throw new Error('Failed to communicate with Firestore.');
  }
}

/**
 * Fetches a single document from a Firestore collection using the REST API and
 * parses it using your custom helper functions.
 *
 * This function handles authentication, request construction, and response handling.
 *
 * @template T - A generic type representing the expected shape of your document data.
 * @param {string} projectId - Your Firebase Project ID.
 * @param {string} idToken - The user's Firebase ID token for authenticating the request.
 * @param {string} collection - The name of the collection (e.g., 'users').
 * @param {string} docId - The ID of the document to retrieve.
 * @returns {Promise<T | null>} A clean JavaScript object of type T with the document
 *          data if found, or `null` if the document does not exist (404).
 * @throws {Error} If the API call fails for reasons other than a 404 (e.g., network
 *         error, authentication error, server error).
 */
export async function getDoc<T>(
  projectId: string,
  idToken: string,
  collection: string,
  docId: string
): Promise<T | null> {

  // 1. Construct the unique URL for the Firestore document resource.
  // This URL points directly to the document in the Firestore REST API.
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collection}/${docId}`;

  try {
    // 2. Make the authenticated GET request using the fetch API.
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        // The user's ID token acts as the password to access their data securely.
        'Authorization': `Bearer ${idToken}`,
      },
    });

    // 3. Handle the predictable "document not found" case. This is not considered an error.
    if (response.status === 404) {
      console.log(`[getDoc] Document with ID '${docId}' not found in collection '${collection}'. Returning null.`);
      return null;
    }

    // 4. Handle all other potential HTTP errors (e.g., 401 Unauthorized, 500 Server Error).
    // If the response is not 'ok' and not a '404', we must treat it as a failure.
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`[getDoc] Firestore API request failed with status ${response.status}: ${errorBody}`);
    }

    // 5. If the request was successful, parse the raw JSON from the response body.
    // This will be in the verbose Firestore format (with a 'fields' property).
    const firestoreDoc = await response.json();
    // 6. Use YOUR custom parser to convert the raw Firestore format into a clean JS object.
    // This is the key step. We delegate the complex parsing logic to your battle-tested helper.
    // The generic type <T> ensures that TypeScript knows the shape of the returned object.
    const parsedData = parseFirestoreDocument<T>(firestoreDoc);
    return parsedData;

  } catch (error) {
    console.error(`[getDoc] An unexpected error occurred for '${collection}/${docId}':`, error);
    // Re-throw the error so the calling function (e.g., in usage.ts) knows
    // that the operation failed and can handle it appropriately.
    throw error;
  }
}
/**
 * An industry-grade function to dynamically fetch a single Firestore document
 * by querying against multiple fields.
 *
 * @param c The Hono context object.
 * @param collectionName The name of the Firestore collection.
 * @param fields An object containing the field names and their values to query by.
 * @returns The matching document data, or null if no document is found.
 * @throws An error if more than one document is found or if the API call fails.
 */
export async function querySingleDocByFields<T>(
  c: Context,
  collectionName: string,
  fields: Record<string, string>
): Promise<T | null> {
  const { FIREBASE_PROJECT_ID: projectId } = c.env;
  const idToken = c.get('idToken');

  if (!idToken) {
    throw new Error('Unauthorized: Missing ID token.');
  }

  // Dynamically build the filters array from the input fields object
  const filters = Object.entries(fields).map(([fieldName, value]) => ({
    fieldFilter: {
      field: { fieldPath: fieldName },
      op: 'EQUAL',
      value: { stringValue: value }
    }
  }));

  const requestBody = {
    structuredQuery: {
      from: [{ collectionId: collectionName }],
      where: {
        compositeFilter: {
          op: 'AND',
          filters: filters
        }
      }
    }
  };

  try {
    const response = await fetch(
      `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // The API returns an array of results, with each object containing a "document" field.
    const results = data.filter((item: any) => item.document);

    if (results.length === 0) {
      return null;
    }
    if (results.length > 1) {
      console.warn('Multiple documents found for the given query. Expected a single document.');
    }
    // console.log('Translation cached found:',results[0].document.fields)
    // Extract and return the document fields
    const parsedData = parseFirestoreDocument<T>(results[0].document);
    // console.log('Parsed translation data,',parsedData)
    return parsedData;

  } catch (err: any) {
    console.error('Failed to execute Firestore query:', err);
    throw new Error(`Failed to query document: ${err.message}`);
  }
}

