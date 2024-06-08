import { createAdminClient, SESSION_ID } from '$lib/appwrite/server/appwrite';
import { LoginSchema } from '$lib/schemas/schema';
import { fail, isRedirect, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { user }}) => {
	if(user) throw redirect(302, "/")
	const form = await superValidate(zod(LoginSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(LoginSchema));

		try {
			if (!form.valid) return fail(400, { form });

			const { account } = createAdminClient();
			const session = await account.createEmailPasswordSession(form.data.email, form.data.password);
			cookies.set(SESSION_ID, session.secret, {
				path: '/',
				expires: new Date(session.expire),
				sameSite: 'strict'
			});
			redirect(302, '/');
		} catch(err) {
			if(isRedirect(err)) throw redirect(err.status, err.location)
			
			return message(form, "Something went wrong. Please try again later")
		}
	}
};
