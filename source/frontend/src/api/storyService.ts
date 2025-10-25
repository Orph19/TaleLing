import * as helpers from '../utils/helpers';

import type { Story, RequestStoryData } from '../types';

// =================================================================
//  PUBLIC API SERVICE FUNCTIONS
// =================================================================

/**
 * Fetches a single, detailed story object by its ID.
 * @param storyId - The unique identifier of the story.
 * @returns {Promise<Story>} A single story object.
 */
export const fetchStoryById = (storyId: string): Promise<Story> => {
  // The validator on the backend REQUIRES a JSON body, even if it's empty.
  return helpers._fetchWithAuth(`/api/story/fetch/single/${storyId}`, {
    method: 'POST',
    body: JSON.stringify({}) 
  });
};

/**
 * Trigers the story generation in the worker backend.
 * @returns {Promise<string>} The ID of the newly created story.
 */
export const createNewStory = async (data: RequestStoryData): Promise<string> => {
  return helpers._fetchWithAuth('/api/generation/story', {
    method: 'POST',
    body: JSON.stringify(data) // Send the request data
  });
};
