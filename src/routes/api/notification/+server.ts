import {
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID
} from '$env/static/public';
import { createSessionClient } from '$lib/appwrite/server/appwrite.js';
import { ID } from 'node-appwrite';

export const POST = async (event) => {
    const { databases } = createSessionClient(event);
	const { type, request, user } = await event.request.json();

	console.log('create notification');
	await databases.createDocument(
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_NOTIFICATIONS_COLLECTION_ID,
		ID.unique(),
		{ type, request, user }
	);
	console.log('done creating notification');

	return new Response('Notification created successfully', { status: 201 });
};
