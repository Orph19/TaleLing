import { Context } from 'hono';
import * as firestoreService from '../../services/firestore.service';
import { getFirebaseConfig, getEnvVarsAdmin} from '../../config/env';

export const getStoryList = async (c: Context) => {
  try {
    // Get data from the context, NOT the body
    const user = c.get('firebaseUser');
    const idToken = c.get('idToken') as string;
    const config = getFirebaseConfig(c);
    const uid = user.sub||user.user_id || user.uid
    if (!uid) throw new Error('Error at getStoryList: No UID from token');

    // Call the service with the correct parameters
    const stories = await firestoreService.fetchStoryList(config, idToken, uid);

    return c.json({ message: 'Stories fetched successfully', data: stories });
  } catch (err: any) {
    console.error("Error fetching story list:", err);
    return c.json({ error: 'Failed to get stories', details: err.message }, 500);
  }
};
