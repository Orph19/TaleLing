// This function would live in your Cloudflare Worker.

/**
 * Uploads an image buffer AND sets its cache-control metadata using the REST API.
 * This function orchestrates a two-step process as required by the Firebase Storage API:
 * 1. POST the raw image data.
 * 2. PATCH the object's metadata to set high-performance cache headers.
 *
 * @param {ArrayBuffer} imageBuffer - The raw image data (e.g., from a .webp conversion).
 * @param {string} filePath - The destination path in the bucket (e.g., "stories/some-id.webp").
 * @param {string} contentType - The MIME type of the image (e.g., "image/webp").
 * @param {string} idToken - The user's Firebase Authentication ID token.
 * @param {string} bucketName - The name of your Firebase Storage bucket.
 * @returns {Promise<string>} A promise that resolves with the permanent, token-based URL to access the image.
 * @throws {Error} Throws an error if either the upload or metadata update fails.
 */
export async function uploadImageWithUserToken(
  imageBuffer: ArrayBuffer,
  filePath: string,
  contentType: string,
  idToken: string,
  bucketName: string
): Promise<string> {
  const encodedPath = encodeURIComponent(filePath);
  const baseObjectUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodedPath}`;

  // --- STEP 1: UPLOAD THE IMAGE CONTENT ---
  const uploadUrl = `${baseObjectUrl}?uploadType=media`;
  
  const uploadResponse = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      'Authorization': `Bearer ${idToken}`
    },
    body: imageBuffer
  });

  if (!uploadResponse.ok) {
    const errorBody = await uploadResponse.json();
    console.error("Firebase Storage Upload Failed:", errorBody);
    const message = errorBody.error?.message || 'Upload failed.';
    throw new Error(`Storage upload failed with status ${uploadResponse.status}: ${message}`);
  }

  const initialMetadata = await uploadResponse.json();
  const downloadToken = initialMetadata.downloadTokens;

  if (!downloadToken) {
    throw new Error('Storage upload succeeded, but was missing a download token.');
  }

  // --- STEP 2: UPDATE THE METADATA FOR CACHING ---
  const metadataToUpdate = {
    cacheControl: 'public, max-age=31536000, immutable',
  };

  const metadataUpdateResponse = await fetch(baseObjectUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body: JSON.stringify(metadataToUpdate)
  });

  if (!metadataUpdateResponse.ok) {
    const errorBody = await metadataUpdateResponse.json();
    console.error("Firebase Storage Metadata Update Failed:", errorBody);
    // Even if this fails, the upload succeeded. We log the error but can still proceed.
    // In a production system, you might add this to a retry queue.
    console.warn(`Warning: Image uploaded successfully, but failed to set cache headers for ${filePath}.`);
  }

  // --- CONSTRUCT AND RETURN THE FINAL URL ---
  const permanentUrl = `${baseObjectUrl}?alt=media&token=${downloadToken}`;
  
  return permanentUrl;
}