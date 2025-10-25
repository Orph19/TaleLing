
import * as firestore from '../services/firestore.js';

async function createDocHandler(req, res) {
	const { collection, docId, data } = req.body;

	if (!collection || typeof data !== 'object') {
		return res.status(400).json({ error: 'Missing or invalid collection or data' });
	}

	try {
		const result = await firestore.createDoc(collection, docId, data);
		return res.status(201).json({ success: true, id: docId || (result && result.id) || 'created' });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: err.message || 'Failed to create document' });
	}
}

async function updateDocHandler(req, res) {
    const { collection, docId, data } = req.body;

    if (!collection || !docId || typeof data !== 'object') {
        return res.status(400).json({ error: 'Missing or invalid collection, docId, or data' });
    }

    try {
        const result = await firestore.updateDoc(collection, docId, data);
        return res.status(200).json({ success: true, id: result.id });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message || 'Failed to update document' });
    }
}

export { createDocHandler, updateDocHandler };
