import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { createAdminClient } from '$lib/appwrite/server/appwrite';
import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from '$env/static/public';
import { Query } from 'node-appwrite';

export const load: PageServerLoad = async ({ locals: { user }, depends }) => {
	depends("appwrite:auth")
	if (!user) redirect(302, '/login');
    const {databases} = createAdminClient()

	const result =await  databases.listDocuments(
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_USERS_COLLECTION_ID,
		[Query.orderDesc('highest_round'), Query.notEqual('highest_round', 0), Query.limit(10)]
	);

    const rank = result.documents.findIndex((d, i) => d.$id === user.id) + 1

	return { user, players: result.documents, userRank: rank };
};
