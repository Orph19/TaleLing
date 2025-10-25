# TaleLing Worker Backend

A Cloudflare Worker backend service for TaleLing, built with Hono.js and TypeScript, providing serverless API endpoints with AI integration.

## 🚀 Features

- Cloudflare Workers serverless platform
- Hono.js framework for edge computing
- Google AI integration
- TypeScript support
- JWT authentication
- Zod validation

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Cloudflare account
- Wrangler CLI (`npm install -g wrangler`)

## 🛠 Installation and Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## 📂 Project Structure

```
worker/
├── src/
│   ├── api/           # API routes and handlers
│   ├── config/        # Configuration
│   ├── lib/           # Common libraries
│   ├── middleware/    # Hono middleware
│   ├── services/      # Business logic services
│   ├── utils/         # Utility functions
│   └── index.ts       # Application entry point
└── wrangler.jsonc     # Cloudflare Workers configuration
```

## 🔧 Configuration

### Wrangler Configuration

The `wrangler.jsonc` file contains your Cloudflare Workers configuration:

- Worker name and entry point
- KV Namespaces
- R2 Buckets
- Environment variables
- Compatibility flags

## ⚡️ Performance

- Leverages Cloudflare's edge network for low latency
- Uses KV storage for caching when appropriate
- Implements proper error handling and timeouts
- Monitor worker performance in Cloudflare dashboard

## 📝 License

This project is licensed under the terms found in the LICENSE file in the root directory.
