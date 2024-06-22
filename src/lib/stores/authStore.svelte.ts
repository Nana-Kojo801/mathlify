import { invalidate } from "$app/navigation";
import { appwrite } from "$lib/appwrite/client/appwrite";
import type { User } from "$lib/types";
import { ID } from "appwrite";

class AuthStore {
    user = $state<User | null>(null)

    async signup({ username, email, password }: Record<string, string>) {
        await appwrite.account.create(ID.unique(), email, password, username)
        invalidate("appwrite:auth")
    }

    async login({ email, password }: Record<string, string>) {
        await appwrite.account.createEmailPasswordSession(email, password)
        invalidate("appwrite:auth")
    }

    async logout() {
        await appwrite.account.deleteSession("current")
        invalidate("appwrite:auth")
    }
}

export const authStore = new AuthStore()