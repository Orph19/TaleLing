import * as helpers from '../utils/helpers';
import {RequestImageData } from '../types';

/**
 * Triggers the generation of a new image for a given story
 */
export const generateStoryImage = async (data:RequestImageData): Promise<any> => {
    return helpers._fetchWithAuth(`/api/generation/image`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}

