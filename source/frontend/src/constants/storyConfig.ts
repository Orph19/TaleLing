/**
 * @file Story Configuration Constants
 * @description Contains static configuration values related to the structure
 *              and generation of stories.
 */

/**
 * The total number of segments a complete story should have.
 * 
 * This is used on the client-side (e.g., in Reader.tsx) to determine
 * if the "Continue" button should be hidden and the story marked as complete.
 * 
 * It's important that this value stays in sync with the corresponding
 * length constants on the backend worker.
 */
export const TOTAL_STORY_SEGMENTS = 17;

// In the future, you could add other client-side story configurations here,
// for example:
// export const MAX_TITLE_LENGTH = 100;
// export const DEFAULT_FONT_SIZE = '16px';