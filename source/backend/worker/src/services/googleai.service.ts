import { GoogleGenAI, Modality } from "@google/genai";
import { Buffer } from "buffer";
import { z } from 'zod';

type SchemaProperties = Record<string, any>;

// =================================================================
//  PRIVATE SANITIZER FUNCTIONS (The Reusable Logic)
// =================================================================

/**
 * Sanitizes and validates the AI's raw JSON output against a given schema.
 * @param rawPayload The raw, unsanitized JSON object from the AI.
 * @param outputSchema The Zod schema defining the expected output shape.
 * @returns The sanitized and validated payload.
 * @throws An error if the payload does not match the schema.
 */
export function _sanitizePayload<T extends z.ZodRawShape>(
  rawPayload: any,
  outputSchema: T
): z.infer<z.ZodObject<T>> {
  // Create a Zod schema object from the provided schema properties
  const schema = z.object(outputSchema);

  // Parse and validate the raw payload
  // .parse() throws a detailed error if validation fails
  return schema.parse(rawPayload);
}

// =================================================================
//  PUBLIC SERVICE FUNCTIONS (Now More Robust)
// =================================================================

/**
 * * @param apiKey Api key
 * @param aiModel Gemini model
 * @param prompt Prompt of the generation
 * @param sdkSchema The plain JavaScript object that defines the properties of the expected JSON output.
 * @param outputSchema The Zod schema defining the expected output shape.
 * @returns 
 */
export async function generateContentAsSchema<T extends z.ZodRawShape>(
    apiKey: string, 
    aiModel: string, 
    prompt: string,
    sdkSchema: object, // This should be a JSON schema object for the properties
    outputSchema: T
): Promise<z.infer<z.ZodObject<T>>> {
    // 1. Initialize with the new class: GoogleGenAI
    const ai = new GoogleGenAI({ apiKey });

    // 2. Call the models.generateContent method directly with configuration
    const response = await ai.models.generateContent({
        model: aiModel,
        contents: prompt,
        config: { // Use the 'config' object for generation settings
            responseMimeType: "application/json",
            responseSchema: sdkSchema,

            temperature: 1
        }
    });
    if (!response || !response.candidates || response.candidates.length === 0) {
        throw new Error('NO candidates found in AI response')
    }
    // The response.text property contains the JSON string
    if (typeof response.text !== 'string' || response.text.length === 0) {
        throw new Error('AI response contains no text to parse');
    }
    const rawPayload: z.infer<z.ZodObject<T>> = JSON.parse(response.text);

    // Sanitize and validate the response against the provided schema
    return _sanitizePayload(rawPayload, outputSchema); 
}
async function getAvailableModels(ai: GoogleGenAI) {

    // The list() method returns a Promise that resolves to a Pager<Model>.
    // Await it first to obtain the async iterable, then iterate with for-await-of.
    const pager = await ai.models.list();

    for await (const model of pager) {
        const supportedMethods = model.supportedActions || [];
        
        console.log(`\nModel Name: ${model.name}`);
        console.log(`  Display Name: ${model.displayName}`);
        console.log(`  Supported Methods: ${supportedMethods.join(', ')}`);
        
        // This is where you would check if a model supports a specific task:
        if (supportedMethods.includes('generateImages')) {
            console.log("  ✅ Supports Image Generation");
        }
    }
}

/**
 * Generates an image using the Gemini API and returns the image data as a Buffer.
 * * @param prompt The text description to generate the image from.
 * @param apiKey Optional. The Gemini API key. If not provided, it attempts to use the GEMINI_API_KEY environment variable.
 * @returns {Promise<Buffer>} A promise that resolves with the image data as a Node.js Buffer.
 */
export async function generateImageBuffer(
    prompt: string,
    apiKey?: string
): Promise<Buffer> {
    
    if (!prompt || typeof prompt !== 'string') {
        throw new Error("Input Error: A valid string prompt is required for image generation.");
    }
    
    // NOTE: The model 'gemini-2.0-flash-preview-image-generation' is scheduled for deprecation.
    // Migrating to 'gemini-2.5-flash-image'.
    const MODEL_NAME = 'gemini-2.5-flash-image';
    
    const ai = new GoogleGenAI({ apiKey });

    try {
        // 1. Use the standard generateContent method for Gemini models
        const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT]
            }
        });

        // 2. Locate the Base64 image data in the response parts
        const candidate = response.candidates?.[0];
        const imagePart = candidate?.content?.parts?.find(
            (part: any) => part.inlineData && part.inlineData.mimeType.startsWith('image/')
        );
        
        const imageDataBase64 = imagePart?.inlineData?.data;

        if (!imageDataBase64) {
            // Note: Gemini models *always* return text, so we check for the image data specifically.
            throw new Error("API Response Error: No image data (Base64) was found in the content parts. The model may have returned text only.");
        }

        // 3. Return as Buffer
        return Buffer.from(imageDataBase64, "base64");
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Error during image generation for prompt "${prompt}": ${errorMessage}`);
        throw new Error(`Image generation process failed. See console for details.`);
    }
}    