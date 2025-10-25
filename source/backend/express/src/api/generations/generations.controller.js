import admin from 'firebase-admin';
import {db} from '../../firebase/admin.js';


/**
 * Updates the status of a request document in Firestore.
 * @param {object} req The Express request object.
 * @param {object} res The Express response object.
 * @returns {Promise<void>}
 */
async function updateRequestStatus(req, res) {
    const { 
        collection, 
        requestId, 
        status, 
        content
    } = req.body;

    // 1. Basic Input Validation
    if (!collection || !requestId || !status) {
        return res.status(400).json({
            error: "InvalidInput",
            message: "Missing required fields: collection, requestId, or status."
        });
    }

    if ((status === 'completed' || status === 'completed-with-image') && content === undefined) {
        // Handle the error here, as a 'completed' status should have content
        return res.status(400).json({
            error: "InvalidInput",
            message: "Content is required when the status is 'completed' or 'completed-with-image'."
        });
    }
    const docRef = db.collection(collection).doc(requestId);

    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);

            // 2. Handle Document Not Found
            if (!doc.exists) {
                // Return a specific error for 'not found'
                res.status(404).json({
                    error: "NotFound",
                    message: "The requested document was not found."
                });
                // Throw an error to abort the transaction
                throw new Error("Transaction aborted: Document not found.");
            }
            
            // Get current document data
            const currentData = doc.data();

            // 3. Handle 'completed' status update
            if (status === 'completed') {
                // Check for a race condition within the transaction
                if (currentData.status === 'completed') {
                    res.status(409).json({
                        error: "AlreadyCompleted",
                        message: "This generation has already been completed and cannot be updated."
                    });
                    // Throw an error to abort the transaction
                    throw new Error("Transaction aborted: Document already completed.");
                }
                const {content} = req.body;
                // Update the document atomically
                transaction.update(docRef, {
                    status: status,
                    content: content,
                    completedAt: admin.firestore.FieldValue.serverTimestamp(),
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                });
            } else if (status === 'completed-with-image') {
                console.log("Updating to completed-with-image");
                if (currentData.status === 'failed') {
                    res.status(409).json({
                        error: "StoryAlreadyFailed",
                        message: "The story has already failed and cannot be updated with an image."
                    });
                    // Throw an error to abort the transaction
                    throw new Error("Transaction aborted: Document found with failed status, can not update with image.");
                }
                const {content} = req.body; 
                transaction.update(docRef, {
                    coverImageUrl: content, // Here, content is the cover image URL
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                });

            } else {
                // Update for other statuses
                transaction.update(docRef, {
                    status: status,
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                });
            }
        });

        // 4. Send success response after the transaction is committed
        if (!res.headersSent) {
            res.status(200).json({ message: 'Request document updated successfully' });
        }

    } catch (err) {
        // 5. Catch and handle errors consistently
        if (!res.headersSent) {
            console.error('Failed to update request status:', err.message);
            res.status(500).json({
                error: "ServerError",
                message: `An unexpected error occurred: ${err.message}`
            });
        }
    }
}

export { updateRequestStatus };