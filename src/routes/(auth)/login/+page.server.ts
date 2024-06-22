import { appwrite } from '$lib/appwrite/client/appwrite.js';
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
	default: async ({ request, fetch }) => {
		const form = await superValidate(request, zod(LoginSchema));

		try {
			if (!form.valid) return fail(400, { form });
			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-type": "application/json" },
				body: JSON.stringify(form.data),
			})
			if (!res.ok) throw Error;
			throw redirect(302, '/');
		} catch(err) {
			if(isRedirect(err)) throw redirect(err.status, err.location)
			return message(form, (err as Error).message)
		}
	}
};
