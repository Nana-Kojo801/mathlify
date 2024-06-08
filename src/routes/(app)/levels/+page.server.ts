import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from "$env/static/public";
import { Query } from "node-appwrite";
import { createAdminClient } from "$lib/appwrite/server/appwrite";

export const load: PageServerLoad = async ({ locals: { user }, depends }) => {
    depends("appwrite:auth")
	if (!user) redirect(302, '/login');

	return { user };
};