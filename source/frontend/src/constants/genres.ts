/**
 * @file Genre Constants
 * @description Contains static data related to story genres, subgenres, and tones.
 *              This is the single source of truth for creative writing options.
 */

// --- Type Definitions ---
// These types ensure that we use consistent and valid genre strings throughout the app.

export type SubGenreKey =
  // Fantasy
  | "High Fantasy"
  | "Urban Fantasy"
  | "Low Fantasy"
  // Science Fiction
  | "Hard Science Fiction"
  | "Soft Science Fiction"
  | "Space Opera"
  // Mystery
  | "Cozy Mystery"
  | "Hardboiled Mystery"
  | "Police Procedural"
  // Thriller
  | "Psychological Thriller"
  | "Legal Thriller"
  | "Spy Thriller"
  // Horror
  | "Supernatural Horror"
  | "Psychological Horror"
  | "Body Horror"
  // Romance
  | "Contemporary Romance"
  | "Paranormal Romance"
  | "Romantic Suspense"
  // Action & Adventure
  | "Military Adventure"
  | "Survival Adventure"
  | "Swashbuckler"
  // Dystopian
  | "Post-Apocalyptic"
  | "Young Adult (YA) Dystopian"
  | "Biopunk";

export type GenreKey =
  | "Fantasy"
  | "Science Fiction"
  | "Mystery"
  | "Thriller"
  | "Horror"
  | "Romance"
  | "Action & Adventure"
  | "Dystopian";

// --- Data Constants ---

/**
 * A list of available tones for story generation.
 */
export const tones: string[] = [
  "Suspenseful",
  "Witty and Humorous",
  "Introspective",
  "Mysterious",
  "Sarcastic"
];

/**
 * A mapping of main genres to their corresponding subgenres.
 * This is used to populate the selection steps in the CreateStoryModal.
 */
export const mapGenres: Record<GenreKey, SubGenreKey[]> = {
  "Fantasy": [
    "High Fantasy",
    "Urban Fantasy",
    "Low Fantasy"
  ],
  "Science Fiction": [
    "Hard Science Fiction",
    "Soft Science Fiction",
    "Space Opera"
  ],
  "Mystery": [
    "Cozy Mystery",
    "Hardboiled Mystery",
    "Police Procedural"
  ],
  "Thriller": [
    "Psychological Thriller",
    "Legal Thriller",
    "Spy Thriller"
  ],
  "Horror": [
    "Supernatural Horror",
    "Psychological Horror",
    "Body Horror"
  ],
  "Romance": [
    "Contemporary Romance",
    "Paranormal Romance",
    "Romantic Suspense"
  ],
  "Action & Adventure": [
    "Military Adventure",
    "Survival Adventure",
    "Swashbuckler"
  ],
  "Dystopian": [
    "Post-Apocalyptic",
    "Young Adult (YA) Dystopian",
    "Biopunk"
  ]
};