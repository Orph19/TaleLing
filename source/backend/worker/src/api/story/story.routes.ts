import { Hono } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { firebaseAuthMiddleware } from '../../middleware/firebaseAuth';
import * as storyController from './story.controller';

const story = new Hono();

// This middleware protects all routes in this file. This is sufficient for auth.
story.use('*', firebaseAuthMiddleware);

/**
 * POST /api/story/fetch/list
 * Fetches the user's stories. Authentication is handled by the middleware,
 * so no body is needed.
 */
story.post(
    '/fetch/list', 
    storyController.getStoryList
);

export default story;