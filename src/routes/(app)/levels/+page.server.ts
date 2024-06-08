import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ locals: { user, online }, depends }) => {
    depends("appwrite:auth")
	if(!online) redirect(302, "/")
	if (!user) redirect(302, '/login');

	return { user };
};