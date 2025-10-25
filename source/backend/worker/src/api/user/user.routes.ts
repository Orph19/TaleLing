import { Hono } from 'hono';
import { firebaseAuthMiddleware } from '../../middleware/firebaseAuth';
import * as userController from './user.controller';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

// Create a new Hono instance that will act as our route group.
const user = new Hono();

const preferencesSchema = z.object({
  sourceLang: z.string().min(1,'Source lang is required'),
  targetLang: z.string().min(1,'Target lang is required')
})

user.use('*', firebaseAuthMiddleware)
/**
 * All routes defined in this file will be prefixed with whatever path
 * we assign in the main `index.ts` file (e.g., '/api/users').
 *
 * This specific route will handle POST requests to the root of this group
 * (e.g., a POST to '/api/users' if we mount this group there).
 * A more specific path like '/initialize' is better practice.
 */

// Route: POST /initialize
// This route is protected by the firebaseAuthMiddleware.
user.post(
  '/initialize',    // This is the specific path for the action
  userController.initializeUser      // The controller runs if middleware succeeds
);

user.get(
  '/profile/exists',      // The specific path for this action
  userController.checkUserExists         // It calls our new controller function
);

user.get(
  '/preferences',
  userController.getUserPreferences
)

user.post(
  '/preferences',
  zValidator('json', preferencesSchema),
  userController.updateUserPreferences
)


export default user;