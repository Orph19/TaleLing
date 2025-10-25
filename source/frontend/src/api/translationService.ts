import * as helpers from '../utils/helpers';
import {RequestTranslationData} from '../types'

/**
 * Triggers the generation of a new translation for a given word
 */
export const getTranslation = async (data:RequestTranslationData): Promise<any> => {
    return helpers._fetchWithAuth(`/api/generation/translation/definition`, {
        method: 'POST',
        body: JSON.stringify(data)
    });
}



