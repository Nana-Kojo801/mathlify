import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID } from "$env/static/public"
import { createSessionClient, ID } from "$lib/appwrite/server/appwrite"
import { json } from "@sveltejs/kit"

export const POST = async (event) => {
    const {databases} = createSessionClient(event)
    const { message } = await event.request.json()

    const newMessage = await databases.createDocument(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID,
        ID.unique(),
        { text: message, user: event.locals.user?.$id }
    )

    return json(newMessage)
}