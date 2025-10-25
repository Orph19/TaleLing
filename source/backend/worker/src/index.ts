import { Hono } from 'hono';
import { cors } from 'hono/cors';

// =================================================================
//  MODULE IMPORTS
// =================================================================
// Import the modular routers from the /api directory.
// Each of these files defines a set of related endpoints.
import storyRoutes from './api/story/story.routes';
import userRoutes from './api/user/user.routes';
import generationRoutes from './api/generation/generation.routes'
// =================================================================
//  HONO APP INITIALIZATION
// =================================================================
// Initialize the Hono app. The .basePath('/api') method prefixes
// all registered routes with /api, so we don't have to repeat it.
const app = new Hono().basePath('/api');

// =================================================================
//  GLOBAL MIDDLEWARE
// =================================================================
// Apply CORS middleware to all routes. This is essential for allowing
// your frontend application to communicate with this worker.
// The configuration is centralized here for easy management.
app.use('*', cors({
  origin: [
    'https://taleling.pages.dev',
    'http://localhost:8787', // For local Cloudflare Pages dev
    'http://localhost:8100', // For local Ionic/Capacitor dev
    // It's good practice to add your worker's production URL here too
    'https://backend.orphmyth417.workers.dev'
  ],
  allowMethods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization']
}));

// =================================================================
//  PUBLIC ROUTES
// =================================================================
// A simple health check endpoint. This is a best practice for any API.
// It allows monitoring services to easily check if the worker is up and running.
// Note: This is registered on the root Hono instance, so its path will be /health
// (the basePath of /api does not apply to this specific route registration style).
const healthApp = new Hono();
healthApp.get('/health', (c) => c.json({ status: 'ok', message: 'TaleLing API is running' }));


// =================================================================
//  API ROUTE REGISTRATION
// =================================================================
// Register the modular routers. The `app.route()` method connects
// the endpoints defined in each router to the main application.
app.route('/story', storyRoutes);
app.route('/users', userRoutes);
app.route('/generation',generationRoutes);
// =================================================================
//  NOT FOUND HANDLER
// =================================================================
// A catch-all route that handles any requests that didn't match
// one of the registered routes, returning a standard 404 Not Found response.
app.all('*', (c) => c.json({ error: 'Not Found', message: `The requested path ${c.req.path} does not exist.` }, 404));

// =================================================================
//  WORKER EXPORT
// =================================================================
// The final export. Cloudflare Workers will direct all incoming fetch
// events to this `app` object, which Hono will then handle.
export default app;