
import {db, bucket} from '../firebase/admin.js';

/**
 * Creates a new document in a Firestore collection.
 * @param {string} collection - The name of the collection.
 * @param {string|undefined} docId - The ID of the document to create.
 * @param {Object} data - A simple JSON object with the data for the document.
 */
async function createDoc(collection, docId, data) {
	
	const collectionRef = db.collection(collection);
	const documentId = docId || collectionRef.doc().id;

	try {
		await collectionRef.doc(documentId).set(data);
		return { id: documentId };
	} catch (error) {
		console.error('Firestore createDoc error:', error);
		throw new Error('Failed to communicate with Firestore to create document.');
	}
}

/**
 * Updates an existing document in a Firestore collection.
 * @param {string} collection - The name of the collection.
 * @param {string} docId - The ID of the document to update.
 * @param {Object} data - A simple JSON object with the updated data for the document.
 * @returns {Promise<Object>} The updated document ID.
 */
async function updateDoc(collection, docId, data) {
    
    const collectionRef = db.collection(collection);

    try {
        await collectionRef.doc(docId).update(data);
        return { id: docId };
    } catch (error) {
        console.error('Firestore updateDoc error:', error);
        throw new Error('Failed to communicate with Firestore to update document.');
    }
}
/**
 * Fetches a single document from a specified Firestore collection.
 * @param {string} collectionName The name of the Firestore collection.
 * @param {string} docId The ID of the document to fetch.
 * @returns {Promise<object>} A promise that resolves with the document data
 * or an object containing an error message.
 */
async function fetchDoc(collectionName, docId) {
  try {
    if (!collectionName || typeof collectionName !== 'string' || !docId || typeof docId !== 'string') {
      return { success: false, errorType: 'InvalidInput', error: 'Invalid input: collectionName and docId must be non-empty strings.' };
    }
    
    const docRef = db.collection(collectionName).doc(docId);
    const docSnapshot = await docRef.get();

    if (!docSnapshot.exists) {
      return { success: false, errorType: 'NotFound', error: 'Document not found.' };
    }

    return { success: true, data: docSnapshot.data() };

  } catch (err) {
    console.error('Error fetching document:', err);
    return { success: false, errorType: 'ServerError', error: `An unexpected error occurred: ${err.message}` };
  }
}




/**
 * Uploads an image buffer (expected to be in WebP format) to a designated,
 * structured path within Firebase Storage.
 *
 * This function is the single source of truth for storing story cover images. It
 * handles the creation of the file path, setting performance-critical metadata
 * for caching, and generating the final public URL.
 *
 * @param {string} storyId - The unique ID of the story, used to create a deterministic file name.
 * @param {Buffer} imageBuffer - The raw image data, which should be a Node.js Buffer
 *   already converted to the optimized WebP format.
 * @returns {Promise<string>} A promise that resolves with the permanent, public URL of the
 *   successfully uploaded image.
 * @throws {Error} Throws a detailed error if the storyId or imageBuffer are invalid,
 *   or if the upload process to Firebase Storage fails. This allows the calling
 *   controller to catch the failure and respond appropriately.
 */
async function uploadImageToStorage(storyId, imageBuffer) {
  // 1. [Validation] A robust function always validates its inputs first.
  if (!storyId || typeof storyId !== 'string') {
    throw new Error('Invalid or missing storyId. Must be a non-empty string.');
  }
  if (!imageBuffer || !Buffer.isBuffer(imageBuffer) || imageBuffer.length === 0) {
    throw new Error('Invalid or empty imageBuffer. Must be a non-empty Buffer.');
  }

  // 2. [File Path] Define a consistent and organized path within the storage bucket.
  const filePath = `story-covers/${storyId}.webp`;
  const file = bucket.file(filePath);

  console.log(`[Storage] Starting upload for storyId: ${storyId} to path: ${filePath}`);

  try {
    // 3. [Metadata] Define critical metadata for browser performance and caching.
    const metadata = {
      contentType: 'image/webp',
      // This header is the key to avoiding future performance headaches.
      // It instructs browsers and CDNs to cache the image for one year.
      cacheControl: 'public, max-age=31536000, immutable',
    };

    // 4. [Upload] Perform the actual upload using the Admin SDK's save method.
    // This method is designed to work directly with Buffers.
    await file.save(imageBuffer, {
      metadata: metadata,
      resumable: false, // Recommended for smaller files to improve performance
    });

    // 5. [URL Generation] Construct the reliable, permanent public URL.
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;

    console.log(`[Storage] Upload successful for storyId: ${storyId}.`);
    
    return publicUrl;

  } catch (error) {
    // 6. [Error Handling] Log the detailed error and throw a new, clean error.
    console.error(`[Storage] FAILED to upload image for storyId: ${storyId}. Original error:`, error);
    
    throw new Error('Failed to upload image to Firebase Storage.');
  }
}

export {createDoc, updateDoc, fetchDoc, uploadImageToStorage};

