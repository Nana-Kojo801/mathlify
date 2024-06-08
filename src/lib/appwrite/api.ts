import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from "$env/static/public"
import { Query, type Models } from "appwrite"
import { appwrite } from "./client/appwrite"
import { invalidate } from "$app/navigation"

export const getUserRank = async (id: string) => {
    const result = await appwrite.databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.orderDesc("highest_round"), Query.notEqual("highest_round", 0), Query.select(["$id"])]
    )
    return result.documents.findIndex((d, i) => d.$id === id) + 1
}

export const getTopTen = async () => {
	const result = await appwrite.databases.listDocuments(
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_USERS_COLLECTION_ID,
		[Query.orderDesc('highest_round'), Query.notEqual('highest_round', 0), Query.limit(10)]
	);
	return result.documents;
};

export const getUserImage = (name: string) => {
    return appwrite.avatars.getInitials(name)
}

export const updateUser = async (userId: string, data:Partial<Omit<Models.Document, keyof Models.Document>>) => {
    await appwrite.databases.updateDocument(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        userId,
        data
    )
    invalidate("appwrite:auth")
}