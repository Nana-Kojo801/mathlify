import { UpdateSchema } from '$lib/schemas/schema';
import { fail, isRedirect, redirect, type Actions } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals: { user } }) => {
	const form = await superValidate(
		zod(UpdateSchema, {
			defaults: {
				username: user?.username as string,
				email: user?.email as string,
				password: user?.password as string,
				image: null
			}
		})
	);

	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod(UpdateSchema));
		if (!form.valid) return fail(400, { form });

		const formData = new FormData()
		for (const key in form.data) {
			formData.append(key, form.data[key])
		}

		try {
			const res = await event.fetch("/api/updateProfile", {
				method: "PUT",
				body: formData
			})
			if (!res.ok) throw Error("Unable to update. Try again later")
			throw redirect(302, '/');
		} catch (err) {
			if (isRedirect(err)) throw redirect(err.status, err.location);
			return message(form, (err as Error).message as string);
		}
	}
};
