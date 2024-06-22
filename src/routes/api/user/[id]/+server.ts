import {
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_USERS_COLLECTION_ID
} from '$env/static/public';
import { createSessionClient } from '$lib/appwrite/server/appwrite.js';
import { user_props } from '$lib/utils.js';
import { json } from '@sveltejs/kit';
import { Query } from 'node-appwrite';

export const GET = async (event) => {
	const { databases } = createSessionClient(event);
	const user = await databases.getDocument(
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_USERS_COLLECTION_ID,
		event.params.id,
		[Query.select(user_props)]
	);

	return json(user);
};

export const PUT = async (event) => {
	const { databases } = createSessionClient(event);
	const data = await event.request.json();
	await databases.updateDocument(
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_USERS_COLLECTION_ID,
		event.params.id,
		data
	);
	
	return json({ success: true });
}