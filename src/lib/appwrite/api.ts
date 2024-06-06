import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from "$env/static/public"
import { ID, Query } from "appwrite"
import { appwrite } from "./appwrite"

export const getUserByEmail = async (email: string) => {
    const results = await appwrite.databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.equal("email", email)]
    )
    return results.documents[0]
}

export const getUserRank = async (id: string) => {
    const result = await appwrite.databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.orderDesc("highest_round"), Query.notEqual("highest_round", 0), Query.select(["$id"])]
    )
    return result.documents.findIndex((d, i) => d.$id === id) + 1
}

export const createUser = async ({ username, password, email }: Record<string, string>) => {
    const newUser = await appwrite.databases.createDocument(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        ID.unique(),
        { username, password, email }
    );
    return newUser;
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