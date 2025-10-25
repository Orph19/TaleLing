/**
 * @file Centralized Type Definitions
 * @description This file contains all shared TypeScript interfaces and types for the application.
 *              Having a single source of truth for data shapes prevents inconsistencies and bugs.
 */

// =================================================================
//  STORY & NARRATIVE TYPES
// =================================================================

/**
 * Represents the detailed metadata associated with a story.
 * This is the `details` object nested within a Story document.
 */
export interface StoryContent {
  title: string;
  story:string;
  description:string;
}
/** * Represents a single word's translation details.
 */
export interface TranslationContent {
  meanings: Array<string>;
  translation: string;
  examples: Array<string>;
}
/**
 * Represents the complete structure of a story object as used throughout the client app.
 * This type is used by the API service, custom hooks, and component props.
 */
export type Story = {
  // The document ID from Firestore, added after fetching. Not part of the stored fields.
  id?: string; 
  
  // Fields stored directly in the Firestore document.
  uid: string; // Firebase Auth UID of the story's owner.

  status: string;
  type:string; // "story"

  createdAt: string; 
  updatedAt?: string; 
  completedAt?: string;

  refunded:boolean;

  
  content: StoryContent;
  selections: InitialStoryData; // User-selected genre, subgenre, and tone
  coverImageUrl?: string; // URL of the story's cover image, if generated
};

// =================================================================
//  API & DATA PAYLOAD TYPES
// =================================================================

/**
 * Defines the data structure required by the API service to generate
 * the initial segment of a new story.
 */
export interface InitialStoryData {
  genre: string;
  subGenre: string;
  tone: string;
}

/**
 * Defines the data structure required by the API service to accept the
 * request and start generating the story 
 */
export interface RequestStoryData {
  selections:InitialStoryData;
  requestId: string;
  sourceLang: string;
  targetLang: string;
}

/**
 * Defines the data structure required by the API service to accept the
 * request and start generating a translation
 */
export type RequestTranslationData = {
    requestId: string,
    word: string;
    sourceLang: string;
    targetLang: string;
    context?: string; // optional context for contextualixation feature
}

/**
 * Defines the data structure required by the API service to accept the
 * request and start generating an image
 */
export type RequestImageData = {
    requestId: string,
    storyId: string,
    style: string;
}

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
