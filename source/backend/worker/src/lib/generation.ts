import {Context} from 'hono';
import { getFirebaseConfig, getGoogleAIConfig } from '../config/env';
import * as googleAiService from '../services/googleai.service';
import * as promptService from '../services/prompt/prompt.service';
import * as translationTemplate from '../services/prompt/templates/translation.template'
import * as imageTemplate from '../services/prompt/templates/image.template'
import {UserSelections,Story} from '../utils/types';
import {z} from 'zod'
import { getDoc} from './firestore'
export const generateContent = async (c:Context) => {
  try {
    const type = c.req.param('type')
    const {sourceLang, targetLang} = await c.req.json()
    const googleAiConfig = getGoogleAIConfig(c);

    switch(type){
      case 'story':
        const {selections} = await c.req.json()
        const {tone, genre, subGenre} = selections
        const storyPrompt = promptService.generateStoryPrompt(
          tone, 
          genre, 
          subGenre, 
          targetLang
        );
        const sdkStorySchema = {
          type: 'object',
          properties: {
              title: { 
                  type: 'string', 
                  description: `The title of the story. It must be a suited, catchy title. It must be written in the language identified as '${targetLang}' in the ISO 639-1 two-letter code`,
                  nullable: false, 
              },
              story: { 
                  type: 'string', 
                  description: 'A opening that follows the requirements.',
                  nullable: false, 
              },
              description: {
                  type: 'string',
                  description: `A truly short, tantalizing blurb that make the reader wonder over the opening they will read. It must be written in the language identified as '${sourceLang}' in the ISO 639-1 two-letter code`,
                  nullable: false,
              }
          },
          nullable:false,
          required: ['title', 'story', 'description'],
          propertyOrdering: ['title', 'story', 'description'],
      };
        const zodStorySchema ={
          title: z.string(),
          story: z.string(),
          description: z.string(),
        };
        const storyObject = await googleAiService.generateContentAsSchema(
          googleAiConfig.apiKey,
          'gemini-2.5-flash', 
          storyPrompt,
          sdkStorySchema,
          zodStorySchema
        );
        return storyObject;

      case 'translation':
        const translationType = c.req.param('subType')

        switch(translationType){
          case 'definition':
            const {word} = await c.req.json()
            const directDefinitionPrompt = translationTemplate.directTranslation(
              word,
              sourceLang,
              targetLang
            )
            const sdkDefinitionSchema =  {
              type: 'object',
              properties: {
                  translation: { 
                      type: 'string', 
                      description: 'The translated word.',
                      nullable: false, 
                  },
                  meanings: { 
                      type: 'array',
                      minItems: 1,
                      maxItems: 2,
                      items: {
                        type: 'string',
                        description: 'Short and easy to understand explanation of the meaning of the word',
                        nullable: false
                      },
                      description: 'The most relevant meanings of the word, if there are more than one',
                      nullable: false,
                  },
                  examples: {
                    type: 'array',
                    items: {
                      type: 'string',
                      description: 'An example sentence using the word as it is written, as exactly as native speaker would use it',
                      nullable: false,
                    },
                    minItems: 1,
                    maxItems: 2,
                    description: 'Examples of how the word is used in a sentence',
                    nullable: false,
                  },
              },
              nullable:false,
              required: ['translation', 'meanings', 'examples'],
              propertyOrdering: ['translation', 'meanings', 'examples'] 
          };
            const zodDefinitionSchema = {
              translation: z.string(),
              meanings: z.array(z.string()).min(1).max(2),
              examples: z.array(z.string()).min(1).max(2)
            }

            const definitionObject = await googleAiService.generateContentAsSchema(
              googleAiConfig.apiKey,
              'gemini-2.5-flash-lite',
              directDefinitionPrompt,
              sdkDefinitionSchema,
              zodDefinitionSchema
            )
            return definitionObject;
          case 'context':
            break;
          default:
            console.warn('Type of [translation] not recognized for AI generation')
            throw new Error('Type of [translation] not recognized');
        }
      case 'image':
        const {storyId, style} = await c.req.json()
        const idToken = c.get('idToken') as string;
        const config = getFirebaseConfig(c); 
        const storyDoc:Story | null = await getDoc(config.projectId, idToken, 'stories', storyId)
        if(!storyDoc) throw new Error('No story found with the provided storyId')
        const imagePrompt = imageTemplate.getImageTemplate(style, storyDoc)
        const imageBuffer = await googleAiService.generateImageBuffer(
          imagePrompt,
          googleAiConfig.apiKey
        )
        return imageBuffer;
      default:
        console.warn('Type of content not recognized for AI generation')
        throw new Error('Type of generation not recognized');
    } 
  } catch(err:any) {
    console.error('Error generating AI content:', err);
    throw new Error('An error occurred during content generation');
  };
}
