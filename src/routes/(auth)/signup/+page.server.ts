import { fail, isRedirect, redirect, type Actions } from '@sveltejs/kit';
import { SignupSchema } from '$lib/schemas/schema';
import { zod } from 'sveltekit-superforms/adapters';
import { message, superForm, superValidate } from 'sveltekit-superforms';
import { ZodError } from 'zod';

export const load = async (event) => {
	const form = await superValidate(zod(SignupSchema));

	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(SignupSchema));

		try {
      if (!form.valid) return fail(400, { form });
			const res = await event.fetch('/api/auth/signup', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(form.data)
			});
			if (!res.ok) throw Error;
      throw redirect(302, "/")
		} catch (err) {
			if (isRedirect(err)) throw redirect(err.status, err.location);
			return message(form, (err as Error).message);
		}
	}
};
