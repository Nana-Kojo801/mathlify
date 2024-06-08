import { SignupSchema } from '$lib/schemas/schema';
import { isRedirect, redirect, type Actions } from '@sveltejs/kit';
import { fail, message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createAdminClient, ID, SESSION_ID } from '$lib/appwrite/server/appwrite';
import {
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_USERS_COLLECTION_ID
} from '$env/static/public';

export const load = async () => {
	const form = await superValidate(zod(SignupSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(SignupSchema));

		if (!form.valid) return fail(400, { form });

		try {
			const { account, databases } = createAdminClient();
			await account.create(ID.unique(), form.data.email, form.data.password, form.data.username);

			await databases.createDocument(
				PUBLIC_APPWRITE_DATABASE_ID,
				PUBLIC_APPWRITE_USERS_COLLECTION_ID,
				ID.unique(),
				{
					username: form.data.username,
					email: form.data.email,
					password: form.data.password
				}
			);

			const session = await account.createEmailPasswordSession(form.data.email, form.data.password);

			cookies.set(SESSION_ID, session.secret, {
				path: '/',
				expires: new Date(session.expire),
				sameSite: 'strict',
			});
			redirect(302, '/');
		} catch (err) {
			if(isRedirect(err)) throw redirect(err.status, err.location)
			return message(form, (err as Error).message as string);
		}
	}
};
