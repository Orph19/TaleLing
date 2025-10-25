# Structure
Both backends are needed for the logic to work. The worker communicates with the Express backend, and this last one only accepts requests if the "Internal Secret" it has matches the one the worker sends. 
## Database
Firestore: Four collections named "users," "images," "stories," and "dictionary."
## Quick checks

- You may have to update the CORS section in /worker/src/index.ts to allow the worker backend to receive requests from the frontend.

- To use Firebase Storage, you will need to update your project's plan to the Blaze Plan.

- Make sure to set up the Firestore and Storage rules. You will find an exact copy from my Firebase project in the database.rules.txt file.

- The project uses the Gemini 2.5 Flash model for image generation. As of this moment, it is only accessible if your Gemini API is linked to a billing account. The project used the 2.0 Flash Image Generation Preview, but it will be deprecated on October 31, 2025.