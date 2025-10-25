/**
 * @file Service for generating dynamic story prompts.
 * @description This service encapsulates all the logic for constructing a detailed
 *              prompt to be sent to the generative AI model.
 */

// Import data, constants, and the template function from the co-located files
import promptData from './prompt.data';
import type { StringArrayObject, StringObject } from '../../utils/types'; // Let's move these helper types
import getNarrativeTemplate from './templates/narrative.template';


// Your helper functions from the original file can live here or in a general utils file.
const selectRandomElement = (inputObject: StringArrayObject): StringObject => {
    const result: StringObject = {};
    for (const key in inputObject) {
        if (Object.prototype.hasOwnProperty.call(inputObject, key)) {
            const array = inputObject[key];
            if (array.length > 0) {
                const randomIndex = Math.floor(Math.random() * array.length);
                result[key] = array[randomIndex];
            }
        }
    }
    return result;
};

const getRandomString = (arr: string[]): string => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

const getRandomObject = <T,>(arr: T[]): T => {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
};

const promptBuilder = (parts: string[]): string => {
    return parts.join('\n\n');
}

/**
 * Generates a complete, randomized story prompt based on genre and tone.
 * @param {string} selectedTone - The desired tone for the story (e.g., "dark & gritty").
 * @param {string} genre - The primary genre (e.g., "fantasy").
 * @param {string} subgenre - The subgenre (e.g., "high_fantasy").
 * @returns {string} The fully constructed prompt text.
 */
export const generateStoryPrompt = (
    selectedTone: string, 
    genre: string, 
    subgenre: string, 
    targetLang:string
): string => {
    let tone;
    for (const toneOption of promptData.styleDetails.tone) {
        const singleTone = toneOption.tone.toLowerCase().replace(/[ &]+/g, "_");
        const newSelectedTone = selectedTone.toLowerCase().replace(/[ &]+/g, "_");
        if (singleTone === newSelectedTone) {
            tone = toneOption;
            break;
        };
    };

    if (!tone) {
        throw new Error(`Tone "${selectedTone}" is not a valid option.`);
    }

    const settings = selectRandomElement(promptData.settings[genre as keyof typeof promptData.settings]);
    const theme = selectRandomElement(promptData.theme[genre as keyof typeof promptData.theme]);
    const detailsCharacters = selectRandomElement(promptData.detailsCharacters[genre as keyof typeof promptData.detailsCharacters]);
    const characters = selectRandomElement(promptData.characters);
    
    const typesOfNarration = ['narrator', 'character'];
    const typeNarration = getRandomString(typesOfNarration);
    
    const point_of_view = getRandomString(promptData.styleDetails.point_of_view[typeNarration as keyof typeof promptData.styleDetails.point_of_view]);
    const voice = getRandomObject(promptData.styleDetails.voice[typeNarration as keyof typeof promptData.styleDetails.voice]);
    const style = getRandomObject(promptData.styleDetails.writing_style);
    const narrativePart = getNarrativeTemplate(targetLang, genre, subgenre, point_of_view, voice, style, tone, characters, detailsCharacters, settings, theme);
    // const taskPart = getTaskTemplate();
    const prompt = promptBuilder([narrativePart]);

    return prompt;
}
