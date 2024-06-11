import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from "$env/static/public";
import { createAdminClient } from "$lib/appwrite/server/appwrite";
import { Query } from "node-appwrite";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async () => {
    const {databases} = createAdminClient()
    const results = await databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.orderDesc("highest_round"), Query.notEqual("highest_round", 0)]
    )

    return { players: results.documents }
};