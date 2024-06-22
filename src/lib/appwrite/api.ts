import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from "$env/static/public"
import { Query, type Models } from "appwrite"
import { appwrite } from "./client/appwrite"
import { invalidate } from "$app/navigation"
import type { User } from "$lib/types"
import { user_props } from "$lib/utils"

export const getUserRank = async (id: string) => {
    const result = await appwrite.databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.orderDesc("highest_round"), Query.notEqual("highest_round", 0), Query.select(["$id"])]
    )
    return result.documents.findIndex((d) => d.$id === id) + 1
}

export const getTopTen = async () => {
	const result = await appwrite.databases.listDocuments(
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_USERS_COLLECTION_ID,
		[Query.orderDesc('highest_round'), Query.notEqual('highest_round', 0), Query.limit(10), Query.select(user_props)]
	);
	return result.documents as unknown as User[];
};

export const getUserImage = (name: string) => {
    return `${PUBLIC_APPWRITE_ENDPOINT}/avatars/initials?name=${name}`
    // return appwrite.avatars.getInitials(name) as unknown as string
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

export const sendRequest = async (currentUserId: string, friend: any) => {
    console.log('sending request');
    await appwrite.databases.updateDocument(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        friend.$id,
        { pending_friends: [...friend.pending_friends, currentUserId] }
    )
}

export const getUserById = async (id: string) => {
    const user = await appwrite.databases.getDocument(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        id,
        [Query.select(user_props)]
    )

    return user as unknown as User
}

export const getUserByEmail = async (email: string) => {
    const results = await appwrite.databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.select(user_props), Query.equal("email", email)]
    )

    return results.documents[0] as unknown as User
}