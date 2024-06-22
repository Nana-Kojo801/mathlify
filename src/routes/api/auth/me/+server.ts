import {
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_USERS_COLLECTION_ID
} from '$env/static/public';
import { createSessionClient } from '$lib/appwrite/server/appwrite';
import { user_props } from '$lib/utils';
import { json } from '@sveltejs/kit';
import { Query } from 'node-appwrite';

export const GET = async (event) => {
	try {
		const { account, databases } = createSessionClient(event);
		const currentAccount = await account.get();
		const results = await databases.listDocuments(
			PUBLIC_APPWRITE_DATABASE_ID,
			PUBLIC_APPWRITE_USERS_COLLECTION_ID,
			[Query.equal('email', currentAccount.email), Query.select(user_props)]
		);
		return json(results.documents[0]);
	} catch {
		return json(null);
	}
};
