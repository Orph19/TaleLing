export const getFirebaseConfig = (c: any) => ({
  projectId: c.env.FIREBASE_PROJECT_ID as string,
  collectionId: 'stories',
  firebaseApiKey: c.env.FIREBASE_API_KEY as string,
});

export const getGoogleAIConfig = (c: any) => ({
  apiKey: c.env.GEMINI_API_KEY as string,
});

export const getEnvVarsAdmin = (c: any) => ({
  apiUrl: c.env.API_URL as string,
  internalSecret: c.env.INTERNAL_SECRET as string,
});
