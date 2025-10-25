# TaleLing Frontend

A modern web application built with React, Ionic, and Vite for creating and managing stories. This application supports both web and Android platforms through Capacitor.

## 🚀 Features

- React-based UI with Ionic components
- Mobile-first design with Android support
- Firebase integration
- End-to-end testing with Cypress
- Unit testing with Vitest

## 📋 Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn
- Java JDK and Android Studio (for Android development)
- Git

## 🛠 Installation

1. Clone the repository and navigate to the frontend directory:
```bash
cd source/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy the environment example file and configure your environment variables:
```bash
cp .env.example .env
```

## 💻 Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test.e2e` - Run end-to-end tests with Cypress
- `npm run test.unit` - Run unit tests with Vitest
- `npm run lint` - Run ESLint

## 📱 Android Development

1. Make sure you have Android Studio installed with the Android SDK.

2. Add Android platform:
```bash
ionic cap add android
```

3. Build the project:
```bash
npm run build
ionic cap sync
```

4. Open in Android Studio:
```bash
ionic cap open android
```

## 🧪 Testing

### Unit Tests
Run unit tests with Vitest:
```bash
npm run test.unit
```

### End-to-End Tests
Run Cypress tests:
```bash
npm run test.e2e
```

## 📦 Building for Production

1. Build the project:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

## 🔧 Configuration

The application can be configured through various files:

- `.env` - Environment variables
- `vite.config.ts` - Vite configuration
- `capacitor.config.ts` - Capacitor configuration
- `ionic.config.json` - Ionic configuration

## 📂 Project Structure

```
frontend/
├── src/                    # Source files
│   ├── api/               # API service integrations
│   ├── components/        # React components
│   ├── config/           # Configuration files
│   ├── constants/        # Constants and enums
│   ├── context/         # React context providers
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   └── utils/           # Utility functions
├── public/               # Static assets
├── android/             # Android platform specific code
└── cypress/             # End-to-end tests
```

## 📝 License

This project is licensed under the terms found in the LICENSE file in the root directory.