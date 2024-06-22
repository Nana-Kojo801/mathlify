import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from "$env/static/public"
import { createSessionClient } from "$lib/appwrite/server/appwrite"
import { json, text } from "@sveltejs/kit"
import { Query } from "node-appwrite"

export const GET = async (event) => {
    const {databases} = createSessionClient(event)
    const results = await databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.orderDesc("highest_round"), Query.notEqual("highest_round", 0), Query.select(["$id"])]
    )
    return text(`${results.documents.findIndex((d, i) => d.$id === event.params.id) + 1}`)

}