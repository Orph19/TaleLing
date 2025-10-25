import {getDefaultCredits} from '../../utils/helpers.js'

import admin from 'firebase-admin';
import * as firestore from '../../services/firestore.js';
const collection = process.env.COLLECTION

async function createUserDoc(req,res){
    const {userId,email} = req.body;
     if (typeof userId !== 'string'||typeof email !== 'string') {
		return res.status(400).json({ error: 'Missing or invalid user UID or email' });
	}
    try {
        const defaultCredits = getDefaultCredits()
        const userSchema = {
            email: email,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            plan:"free",
            credits: defaultCredits,
            lastResetDate: "2006-12-05",
            recentRequests:[],
            usage: {
                story: 0,
                image: 0,
                definition: 0,
                context: 0
            }
        }
        const result = await firestore.createDoc(collection,userId,userSchema)
        return res.status(201).json({ success: true, id: userId || (result && result.id) || 'created' });
    } catch (err){
        console.error(err);
		return res.status(500).json({ error: err.message || 'Failed to create user document' });
    }
}

async function updateUserDoc(req,res){
    const {userId , data} = req.body;
    if (typeof userId !== 'string'|| !data) {
		return res.status(400).json({ error: 'Missing or invalid user UID or data to update' });
    }

    try {
        const result = await firestore.updateDoc('users',userId,data)
        return res.status(200).json({ success: true, id: userId || (result && result.id) })
    } catch(err){
        console.error(err);
		return res.status(500).json({ error: err.message || 'Failed to update user document' });
    }
}

export { createUserDoc, updateUserDoc }
