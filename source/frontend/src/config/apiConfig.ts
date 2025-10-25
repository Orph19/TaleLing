/**
 * @file API Configuration
 * @description Centralizes the configuration for connecting to the backend API.
 */

/**
 * The base URL for the backend Cloudflare Worker API.
 * 
 * It reads the URL from Vite's environment variables. This is a best practice
 * as it allows you to use different URLs for development and production
 * without changing the code.
 * 
 * In your `.env.development` or `.env` file, you would have:
 * VITE_API_BASE_URL=http://127.0.0.1:8787
 * 
 * In your production environment (e.g., Netlify, Vercel), you would set:
 * VITE_API_BASE_URL=https://your-worker-url.workers.dev
 */
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// You can add other API-related configurations here in the future,
// for example, a default timeout value or API keys for other services.