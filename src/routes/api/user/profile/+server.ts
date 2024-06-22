import {
	PUBLIC_APPWRITE_BUCKET_ID,
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_ENDPOINT,
	PUBLIC_APPWRITE_PROJECT,
	PUBLIC_APPWRITE_USERS_COLLECTION_ID
} from '$env/static/public';
import { createSessionClient } from '$lib/appwrite/server/appwrite.js';
import { ID } from "node-appwrite"

export const PATCH = async (event) => {
	const { username, email, password, image } = Object.fromEntries(
		await event.request.formData()
	) as { username: string; email: string; password: string; image: File | null };

	console.log('img', image);
	

    const user = event.locals.user!

	const { account, databases, storage } = createSessionClient(event);

	console.log('start updating');
	
	console.log('updating username');
	
	await account.updateName(username);
	console.log('updating email');
	
	await account.updateEmail(email, user.password);
	
	console.log('updating password');
	
	await account.updatePassword(password, user.password);

	// if (image) {
	// 	const oldImage = await storage.getFile(PUBLIC_APPWRITE_BUCKET_ID, user.$id)
	// 	console.log('oldImage', oldImage);
		
	// 	if (oldImage) await storage.deleteFile(PUBLIC_APPWRITE_BUCKET_ID, ID.unique())
	// 	await storage.createFile(PUBLIC_APPWRITE_BUCKET_ID!, ID.unique(), image);
	// }

	// const url = `${PUBLIC_APPWRITE_ENDPOINT}/v1/storage/files/${event.locals.user?.$id}/view?project=${PUBLIC_APPWRITE_PROJECT}`;
	// console.log('url', url);
	

	const newD = await databases.updateDocument(
		PUBLIC_APPWRITE_DATABASE_ID,
		PUBLIC_APPWRITE_USERS_COLLECTION_ID,
		ID.unique(),
		{ username, email, password }
	)
	console.log('done updating');
	
	console.log('new user', newD);
	
    return new Response("Successfully updated user")
};