import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID } from "$env/static/public"
import { createSessionClient } from "$lib/appwrite/server/appwrite"
import { json } from "@sveltejs/kit"

export const DELETE = async (event) => {
    const {databases} = createSessionClient(event)
    const { id } = await event.request.json()

    await databases.deleteDocument(PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_MESSAGES_COLLECTION_ID, id)

    return json({ success: true })
}