import { Context } from 'hono';
import { getEnvVarsAdmin } from '../../config/env';
import { LimitExceededError } from '../../utils/types';
import { comunicateApiAdmin } from '../../lib/api.admin';
import { generateContent } from '../../lib/generation';
import type { FirebaseUser } from '../../utils/types';
import {uploadImageWithUserToken} from '../../lib/firebase.storage'
import { Buffer } from 'buffer';
// New utility function for reserving credits.
async function reserveCredits(c: Context, payload: any) {
  const envAdmin = getEnvVarsAdmin(c);
  const response = await comunicateApiAdmin(envAdmin, '/credits/reserve', payload);
  if (response.status === 429) {
    throw new LimitExceededError('Rate limit reached. Your credits will be reset tomorrow');
  }
  if (response.status < 200 || response.status >= 300) {
    throw new Error(response.error || `Failed to reserve credits. Status: ${response.status}`);
  }
}

// New dedicated function for handling background generation.
async function handleBackgroundGeneration(c: Context, generationDetails: any) {
  const { nameOfCollection, requestId, creditBucketUsed, storyId } = generationDetails;
  const user = c.get('firebaseUser') as FirebaseUser;
  const envAdmin = getEnvVarsAdmin(c);
  const idToken = c.get('idToken');
  try {
    let content: { title: string; story: string; description: string; } | { translation: string; meanings: string[]; examples: string[]; } | Buffer | string = await generateContent(c) as any;
    if (!content) {
      throw new Error('Content was returned empty after generation.');
    }
    if (creditBucketUsed==='image') {
      // Convert Node Buffer to an ArrayBuffer slice that represents the exact bytes
      const nodeBuf = content as Buffer;
      const arrayBuffer = nodeBuf.buffer.slice(nodeBuf.byteOffset, nodeBuf.byteOffset + nodeBuf.byteLength);

      const imageUrl = await uploadImageWithUserToken(
          arrayBuffer as ArrayBuffer,
          `stories/${storyId}/covers/${requestId}`,
          "image/png",
          idToken,
          "taleling-6a2ba.firebasestorage.app"
      );

      content = imageUrl;

      await comunicateApiAdmin(envAdmin, '/generations/update', {
        collection: 'stories',
        requestId: storyId,
        status: 'completed-with-image',
        content,
      });
    }

    await comunicateApiAdmin(envAdmin, '/generations/update', {
        collection: nameOfCollection,
        requestId,
        status: 'completed',
        content,
      });
    
  } catch (genErr: any) {
    console.error(`Generation failed for requestId=${requestId}:`, genErr);
    try {
      await comunicateApiAdmin(envAdmin, '/generations/update', {
        collection: nameOfCollection,
        requestId,
        status: 'failed'
      });
    } catch (updateErr: any) {
      console.error('Failed to mark generation as failed:', updateErr);
    }
    try {
      await comunicateApiAdmin(envAdmin, '/credits/refund', {
        userId: user.uid,
        creditBucket: creditBucketUsed,
        collection: nameOfCollection,
        requestId,
      });
    } catch (refundErr: any) {
      console.error('Failed to refund credits:', refundErr);
    }
  }
}

// Corrected controller function with proper return statements.
export const createNewContent = async (c: Context, body: any, type: string, subType?: string) => {
  const user = c.get('firebaseUser') as FirebaseUser;
  let nameOfCollection: string;
  let creditBucketUsed: string;

  try {
    const { requestId } = body;
    let payload;
    switch (type) {
      case 'story':
        payload = { selections: body.selections };
        nameOfCollection = 'stories';
        creditBucketUsed = 'story';
        break;
      case 'translation':
        if (subType === 'definition') {
          payload = { word: body.word, sourceLang: body.sourceLang, targetLang: body.targetLang };
          nameOfCollection = 'dictionary';
          creditBucketUsed = 'definition';
        } else {
          return c.json({ error: 'Invalid translation subtype' }, 400);
        }
        break;
      case 'image':
        payload = { storyId: body.storyId, subType: 'cover', style: body.style }
        nameOfCollection = 'images';
        creditBucketUsed = 'image';
        break;
      default:
        return c.json({ error: 'Unsupported content type.' }, 400);
    }
    const adminReservePayload = {
      userId: user.uid,
      creditBucket: creditBucketUsed,
      collection: nameOfCollection,
      requestId,
      fields: payload,
    };
    await reserveCredits(c, adminReservePayload);
    c.executionCtx.waitUntil(handleBackgroundGeneration(c, {
      nameOfCollection,
      requestId,
      creditBucketUsed,
      storyId: body.storyId
    }));
    return c.json({ message: 'Credits reserved. Content generation started.', requestId }, 201);
  } catch (err: any) {
    if (err instanceof LimitExceededError) {
      return c.json({ error: err.message }, 429);
    }
    console.error('Error in createNewContent:', err);
    return c.json({ error: 'Failed to start content generation' }, 500);
  }
};