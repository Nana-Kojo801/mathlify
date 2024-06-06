import {
	PUBLIC_APPWRITE_DATABASE_ID,
	PUBLIC_APPWRITE_USERS_COLLECTION_ID
} from '$env/static/public';
import { createUser, getUserByEmail, getUserRank } from '$lib/appwrite/api';
import { appwrite } from '$lib/appwrite/appwrite';
import { ID, type Models } from 'appwrite';

class UserStore {
	user = $state<Models.Document | null>(null);
	loading = $state({
		updatingUser: false,
		creatingUser: false,
		gettingLoggedInUser: false,
		settingLoggedInUser: false,
		loggingOutUser: false,
		signingUpUser: false,
		loggingInUser: false
	});

	async updateUser(data: Partial<Omit<Models.Document, keyof Models.Document>>) {
		this.loading.updatingUser = true;
		const newUser = await appwrite.databases.updateDocument(
			PUBLIC_APPWRITE_DATABASE_ID,
			PUBLIC_APPWRITE_USERS_COLLECTION_ID,
			this.user?.$id as string,
			data
		);
		this.user = newUser;
		this.user.image = appwrite.avatars.getInitials(this.user.username);
		this.loading.updatingUser = false;
	}

	async initUser() {
		try {
			const account = await appwrite.account.get();
			this.loading.settingLoggedInUser = true;
			const user = await getUserByEmail(account.email);
			if (!user) return (this.user = null);

			if (!user.image) {
				user.image = appwrite.avatars.getInitials(user.username);
			}
			user.rank = await getUserRank(user.$id);
			this.user = user;
		} catch {
			this.user = null;
		} finally {
			this.loading.settingLoggedInUser = false;
		}
	}

	async logout() {
		this.loading.loggingOutUser = true;
		await appwrite.account.deleteSession('current');
		this.user = null;
		this.loading.loggingOutUser = false;
	}

	async signup({ username, email, password }: Record<string, string>) {
		this.loading.signingUpUser = true;
		await appwrite.account.create(ID.unique(), email, password, username);
		await createUser({ username, password, email });
		await this.login({ email, password });
		this.loading.signingUpUser = false;
	}

	async login({ email, password }: Record<string, string>) {
        this.loading.loggingInUser = true
		await appwrite.account.createEmailPasswordSession(email, password);
		await this.initUser();
        this.loading.loggingInUser = false
	}
}

export const userStore = new UserStore();
