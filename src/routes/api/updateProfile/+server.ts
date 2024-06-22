import {
	PUBLIC_APPWRITE_BUCKET_ID,
	PUBLIC_APPWRITE_ENDPOINT,
	PUBLIC_APPWRITE_PROJECT
} from '$env/static/public';
import { createSessionClient } from '$lib/appwrite/server/appwrite.js';
import { ID } from 'node-appwrite';

export const PUT = async (event) => {
	const { account, storage } = createSessionClient(event);
	const formData = Object.fromEntries(await event.request.formData()) as Record<
		string,
		string | File | null
	>;
	console.log('formData', formData);

	await account.updateName(formData.username as string);
	await account.updatePassword(formData.password as string, event.locals.user?.password);

	let url = event.locals.user?.image as string;

	if (formData.image !== 'null') {
		const files = await storage.listFiles(PUBLIC_APPWRITE_BUCKET_ID)
        console.log('files', files);
        
        if (files.total > 0) {
            console.log('file already exists');
            
            for (const file of files.files) {
                await storage.deleteFile(PUBLIC_APPWRITE_BUCKET_ID, file.$id)
            }
        }

        const id = ID.unique()
		await storage.createFile(
			PUBLIC_APPWRITE_BUCKET_ID!,
			id,
			formData.image as File
		);
        
		url = `${PUBLIC_APPWRITE_ENDPOINT}/storage/buckets/${PUBLIC_APPWRITE_BUCKET_ID}/files/${id}/view?project=${PUBLIC_APPWRITE_PROJECT}`;
		// /storage/buckets/{bucketId}/files/{fileId}/view
	}

	console.log('url', url);

	await event.fetch(`/api/user/${event.locals.user?.$id as string}`, {
		method: 'PUT',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify({
			username: formData.username,
			password: formData.password,
			image: url
		})
	});

	return new Response('Successfully updated profile');
};
