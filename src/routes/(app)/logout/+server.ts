import { invalidate } from '$app/navigation';
import { createSessionClient, SESSION_ID } from '$lib/appwrite/server/appwrite';
import { redirect, type Actions, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	const { account } = createSessionClient(event);
	await account.deleteSession('current');
	event.cookies.delete(SESSION_ID, { path: '/' });
	// invalidate("appwrite:auth")
	throw redirect(302, '/');
};
