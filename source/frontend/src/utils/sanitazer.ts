import {TranslationContent} from '../types'

export function sanitizeContent(data: any): TranslationContent | null {
  if (!data || !data.content || typeof data.content.translation !== 'string') return null;
  return {
    translation: data.content.translation,
    meanings: Array.isArray(data.content.meanings) ? data.content.meanings : [],
    examples: Array.isArray(data.content.examples) ? data.content.examples : [],
  };
}
