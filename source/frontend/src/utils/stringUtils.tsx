import React from 'react';

/**
 * Cleans a word by removing leading and trailing punctuation and converts it to lowercase.
 * Now includes the em-dash in the punctuation to be removed.
 * @param word The word to clean.
 * @returns The cleaned word, ready for an API call.
 */
const cleanWord = (word: string): string => {
  // NEW: Convert the word to lowercase first.
  let cleaned = word.toLowerCase();

  // Added the em-dash (—) to the list of punctuation to be stripped
  // from the start or end of a word.
  const punctuationRegex = /^[.,;:?!()"\[\]{}—]+|[.,;:?!()"\[\]{}—]+$/g;
  
  // Apply punctuation stripping to the lowercase word.
  return cleaned.replace(punctuationRegex, '');
};

/**
 * Takes a single string of text and breaks it into an array of interactive <span> elements.
 * This version intelligently handles spaces and em-dashes as word separators.
 * @param text - The segment of text to process.
 * @returns An array of React nodes (spans and the separators between them).
 */
export const generateClickableWords = (text: string): React.ReactNode[] => {
  if (!text) {
    return [];
  }

  // --- MAJOR UPDATE ---
  // This is the core of the new logic. Instead of just splitting by spaces,
  // we now split by a regular expression.
  // The parentheses `()` create a "capturing group". When used with split(),
  // it tells JavaScript to include the separator (the space or em-dash) in the
  // resulting array.
  //
  // Example: "landscape—a" becomes ["landscape", "—", "a"]
  // Example: "word. Another" becomes ["word.", " ", "Another"]
  const tokens = text.split(/(\s+|—)/);

  // Now we map over our new array of 'tokens', which contains both words
  // and the separators.
  return tokens.map((token, index) => {
    // We need to determine if the token is a word or a separator.
    // A simple way is to check if it contains any "word" characters (letters/numbers).
    // The regex /\w/ checks for any alphanumeric character.
    if (/\w/.test(token)) {
      // If it's a word, we treat it just like before.
      const cleaned = cleanWord(token);
      return (
        // Note: We no longer need the <React.Fragment> or the trailing space {' '}
        // because the spaces are now included as tokens in our array.
        <span key={`word-${index}`} data-clean-word={cleaned}>
          {token}
        </span>
      );
    } else {
      // If it's not a word, it must be a separator (e.g., ' ', '  ', or '—').
      // We just render it directly as is, preserving the original formatting.
      return (
        <React.Fragment key={`sep-${index}`}>
            {token}
        </React.Fragment>
      );
    }
  });
};

/**
 * Formats story text to be pleasant and readable.
 * - Normalizes whitespace.
 * - Ensures a space follows sentence-ending punctuation.
 * - Ensures each paragraph is separated by a blank line.
 * - Adds a final period if missing.
 * - Capitalizes the first letter of each paragraph.
 * @param text Raw story text.
 * @returns Formatted story text string.
 */
export const formatStoryText = (text: string): string => {
  if (!text) return '';

  // Normalize whitespace
  let formatted = text.replace(/\r\n/g, '\n').trim();

  // NEW FIX: Ensure there is a space after sentence-ending punctuation (.!?).
  // The regex ([.!?]) matches the punctuation (Group 1), and (\S) matches 
  // any non-whitespace character immediately following it (Group 2). 
  // It replaces them with the punctuation, a single space, and the following character ($1 $2).
  formatted = formatted.replace(/([.!?])(\S)/g, '$1 $2');

  // Split into paragraphs by double line breaks or single line breaks
  const paragraphs = formatted
    .split(/\n{2,}|\n/)
    .map(p => p.trim())
    .filter(p => p.length > 0)
    .map(p => {
      // Capitalize first letter
      const cap = p.charAt(0).toUpperCase() + p.slice(1);
      // Add period if missing at the end
      return /[.!?]$/.test(cap) ? cap : cap + '.';
    });

  // Rejoin paragraphs with a blank line between
  return paragraphs.join('\n\n');
};