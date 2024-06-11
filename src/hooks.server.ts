import {
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_USERS_COLLECTION_ID
} from '$env/static/public';
import { createSessionClient } from '$lib/appwrite/server/appwrite';
import type { Handle } from '@sveltejs/kit';
import { Query } from 'node-appwrite';

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const { account, databases } = createSessionClient(event);
		event.locals.account = await account.get();
		const results = await databases.listDocuments(
			PUBLIC_APPWRITE_DATABASE_ID,
			PUBLIC_APPWRITE_USERS_COLLECTION_ID,
			[Query.equal('email', event.locals.account.email)]
		);

		const user = results.documents[0];
		event.locals.user = {
			id: user.$id,
			username: user.username,
			completed_levels: user.completed_levels,
			highest_round: user.highest_round
		};
		
	} catch (err) {
		event.locals.account = null;
		event.locals.user = null;
	}

	return resolve(event);
};
