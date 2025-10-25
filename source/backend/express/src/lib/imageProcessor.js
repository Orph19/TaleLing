import sharp from 'sharp';

/**
 * Converts a raw image buffer (e.g., from a PNG) into an optimized WebP buffer.
 * This function encapsulates the image processing logic, making it a reusable
 * utility for any image optimization needs.
 *
 * @param {Buffer} inputBuffer - The raw image data in a Node.js Buffer object.
 * @returns {Promise<Buffer>} A promise that resolves with a new Buffer containing
 *   the image data in WebP format.
 * @throws {Error} Throws an error if the image conversion process fails.
 */
export async function convertImageToWebp(inputBuffer) {
  if (!inputBuffer || !Buffer.isBuffer(inputBuffer)) {
    throw new Error('Invalid input: A valid Buffer must be provided.');
  }

  try {
    console.log('[ImageProcessor] Starting image conversion to WebP...');

    const webpBuffer = await sharp(inputBuffer)
      // The quality setting is a balance between file size and visual fidelity.
      // 80 is a widely accepted, excellent default for web images.
      .webp({ quality: 80 })
      .toBuffer();

    console.log('[ImageProcessor] Image successfully converted to WebP.');
    
    return webpBuffer;
  } catch (error) {
    console.error('[ImageProcessor] FAILED to convert image to WebP.', error);
    // Re-throw to allow the main controller to handle the failure.
    throw new Error(`Image processing failed: ${error.message}`);
  }
}