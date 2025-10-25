export interface FirestoreStoryDoc {
  /** Generation request status: pending → completed/failed */
  status: 'pending' | 'completed' | 'failed';

  /** Optional content data. Present when status === 'completed' */
  content?: {
    /** The generated story text */
    title: string;
    story: string;
  };
  /** Bucket of credits that was used for the generation */
  type: string;
  
  /** ID of the user who requested the story */
  uid: string;

  /** Selections or preferences used to generate the story */
  selections?: {
    genre?: string;
    subGenre?: string;
    tone?: string;
    [key: string]: any;
  };

  /** Timestamp fields for auditing/debugging */
  completedAt? : string | number // To register when completed
  createdAt: string | number;  // ISO string or Firestore timestamp
  updatedAt?: string | number; // Updated whenever status/content changes

  /** Flag if credits have been refunded already */
  refunded: boolean;
}
