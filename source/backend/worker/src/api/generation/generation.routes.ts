import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { firebaseAuthMiddleware } from '../../middleware/firebaseAuth';
import * as generationController from './generation.controller';

const generation = new Hono();

const storySchema = z.object({
  requestId: z.string({
    required_error: 'Request ID is required.',
    invalid_type_error: 'Request ID must be a string.',
  }),
  sourceLang: z.string({
    required_error: 'Source language is required.',
    invalid_type_error: 'Source language must be a string.',
  }),
  targetLang: z.string({
    required_error: 'Target language is required.',
    invalid_type_error: 'Target language must be a string.',
  }),
  selections: z.object({
    genre: z.string({
      required_error: 'Genre is required.',
      invalid_type_error: 'Genre must be a string.',
    }),
    subGenre: z.string({
      required_error: 'Sub-genre is required.',
      invalid_type_error: 'Sub-genre must be a string.',
    }),
    tone: z.string({
      required_error: 'Tone is required.',
      invalid_type_error: 'Tone must be a string.',
    }),
  }),
});

const translationSchema = z.object({
  requestId: z.string(),
  word: z.string().min(1),
  sourceLang: z.string().min(1),
  targetLang: z.string().min(1),
});

const imageSchema = z.object({
  requestId: z.string(),
  storyId: z.string().min(1),
  style: z.string().min(1),
});

const rootSchema = z.union([storySchema, translationSchema, imageSchema]);

generation.use('*', firebaseAuthMiddleware);

generation.post(
  '/:type/:subType?', // Mark :subType as optional with '?'
  zValidator('json', rootSchema),
  async (c) => {
    const type = c.req.param('type');
    const subType = c.req.param('subType');
    const body = c.req.valid('json');

    // The route handler's only job is to route based on parameters.
    switch (type) {
      case 'story':
        // Pass the validated body to the controller.
        return generationController.createNewContent(c, body, type);

      case 'translation':
        switch (subType) {
          case 'definition':
            return generationController.createNewContent(c, body, type, subType);
          default:
            return c.json({ error: 'Invalid translation subtype' }, 400);
        }
      case 'image':
        return generationController.createNewContent(c, body, type)
      default:
        return c.json({ error: 'Invalid content type' }, 400);
    }
  }
);

export default generation;