
import { createSessionClient, SESSION_ID } from '$lib/appwrite/server/appwrite';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = async () => {
	throw redirect(302, "/")
};

export const actions: Actions = {
	default: async (event) => {
		console.log('logout');
		const { account } = createSessionClient(event);
		await account.deleteSession('current');
		event.cookies.delete(SESSION_ID, { path: '/' });
		// invalidate("appwrite:auth")
		throw redirect(302, '/');
	}
};
