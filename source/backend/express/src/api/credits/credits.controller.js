import {db} from '../../firebase/admin.js';
import { reserveTransaction, refundTransaction } from '../../firebase/transaction.js';
import { fetchDoc } from '../../services/firestore.js';
import { LimitExceededError } from '../../utils/types.js';

async function reserveCredits(req, res) {
  const { 
    userId, 
    creditBucket, 
    collection, 
    requestId, 
    fields 
  } = req.body;

  // basic validation
  if (!userId || !creditBucket || !collection || !requestId) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  const userRef = db.collection('users').doc(userId);

  try {
    // runTransaction should return a value from the callback (reserveTransaction is expected to return an object)
    const result = await db.runTransaction(async (transaction) => {
      return await reserveTransaction(transaction, userRef, creditBucket, collection, requestId, fields);
    });

    // success
    return res.status(200).json({
      success: true,
      message: 'Credits reserved and generation request created',
      data: result || {},
    });
  } catch (err) {
    // domain-specific error
    if (err instanceof LimitExceededError) {
      return res.status(429).json({ success: false, error: 'Insufficient credits' });
    }

    // transaction retries/Firestore errors may come here
    console.error('[reserveCredits] transaction failed:', err && (err.stack || err.message || err));
    return res.status(500).json({ success: false, error: 'Failed to reserve credits' });
  }
}

async function refundCredits(req, res) {
  const { 
    userId, 
    creditBucket, 
    collection, 
    requestId 
  } = req.body;

  if (!userId || !creditBucket || !collection || !requestId) {
    return res.status(400).json({ success: false, error: 'Missing required fields' });
  }

  try {
    // fetch generation doc first (short-circuit if invalid)
    const generationResult = await fetchDoc(collection, requestId);

    if (!generationResult.success) {
      if (generationResult.errorType === 'NotFound') {
        return res.status(404).json({ success: false, error: 'Generation not found' });
      }
      console.error('[refundCredits] fetchDoc error:', generationResult);
      return res.status(500).json({ success: false, error: 'Failed to fetch generation document' });
    }

    const generationDoc = generationResult.data;

    // already completed or already refunded -> conflict
    if (generationDoc.refunded === true) {
      return res.status(409).json({ success: false, error: 'Generation already refunded' });
    }
    
    if (generationDoc.status !== 'failed'){
      return res.status(409).json({ success: false, error: 'Cannot refund a non-failed request' });
    }

    // perform atomic refund (updates user credits and marks generation refunded)
    await db.runTransaction(async (transaction) => {
      await refundTransaction(transaction, userId, creditBucket, collection, requestId);
    });

    return res.status(200).json({ success: true, message: 'Refund applied' });
  } catch (err) {
    console.error('[refundCredits] failed:', err && (err.stack || err.message || err));
    return res.status(500).json({ success: false, error: 'Failed to refund credits' });
  }
}

export {
  reserveCredits,
  refundCredits,
};
