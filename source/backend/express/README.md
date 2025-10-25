# TaleLing Express Backend

A Firebase Admin SDK powered Express.js backend service for TaleLing, handling authentication, data management, and administrative operations.

## 🚀 Features

- Express.js REST API
- Firebase Admin SDK integration
- Environment-based configuration
- Administrative operations support

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Firebase project with Admin SDK credentials

## 🛠 Installation

1. Clone the repository and navigate to the express backend directory:
```bash
cd source/backend/express
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env
```

4. Set up Firebase Admin SDK:
   - Generate a new private key from Firebase Console
   - Save it as `admin-sdk.json` in the root directory

## 💻 Development

Start the development server with hot-reload:
```bash
npm run dev
```

The server will start on the configured port.

### Available Scripts

- `npm run start` - Start the server
- `npm run dev` - Start development server with nodemon

## 📂 Project Structure

```
express/
├── src/
│   ├── api/            # API routes and controllers
│   ├── docs/           # 
│   ├── firebase/       # Firebase Admin SDK setup
│   ├── lib/            # Common libraries
│   ├── middleware/     # Express middleware
│   ├── services/       # Business logic services
│   ├── utils/          # Utility functions
│   └── index.js        # Application entry point
├── admin-sdk.json      # Firebase Admin SDK credentials
└── .env               # Environment variables
```

## 🔧 Configuration

### Firebase Admin SDK

1. Go to Firebase Console > Project Settings > Service Accounts
2. Generate a new private key
3. Save the JSON file as `admin-sdk.json` in the project root

## 📝 License

This project is licensed under the terms found in the LICENSE file in the root directory.