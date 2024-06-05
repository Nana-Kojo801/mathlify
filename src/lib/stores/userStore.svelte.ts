import { PUBLIC_APPWRITE_DATABASE_ID, PUBLIC_APPWRITE_USERS_COLLECTION_ID } from "$env/static/public";
import { appwrite } from "$lib/appwrite/appwrite";
import { ID, Query, type Models } from "appwrite";

class UserStore {
    user = $state<Models.Document | null>(null)
    loading = $state({
        updatingUser: false,
        creatingUser: false,
        gettingLoggedInUser: false,
        settingLoggedInUser: false,
        loggingOutUser: false
    })

    async updateUser(data: Partial<Omit<Models.Document, keyof Models.Document>>) {
        this.loading.updatingUser = true
        const newUser = await appwrite.databases.updateDocument(
            PUBLIC_APPWRITE_DATABASE_ID,
            PUBLIC_APPWRITE_USERS_COLLECTION_ID,
            this.user?.$id as string,
            data
        )
        this.user = newUser
        this.user.image = this.getUserImage(this.user.username)
        this.loading.updatingUser = false
    }

    async createUser({ username, password, email }: Record<string, string>) {
        this.loading.creatingUser = true
        const  newUser = await appwrite.databases.createDocument(
            PUBLIC_APPWRITE_DATABASE_ID,
            PUBLIC_APPWRITE_USERS_COLLECTION_ID,
            ID.unique(),
            { username, password, email }
        )
        this.loading.creatingUser = false
        return newUser
    }

    getUserImage(name: string) {
        return appwrite.avatars.getInitials(name)
    }

    async setUser(userAccount: Models.User<Models.Preferences>) {
        this.loading.settingLoggedInUser = true
        const result = await appwrite.databases.listDocuments(
            PUBLIC_APPWRITE_DATABASE_ID,
            PUBLIC_APPWRITE_USERS_COLLECTION_ID,
            [Query.equal("email", userAccount.email)]
        )
        const user = result.documents[0]

        if (!user) return this.user = null

        if (!user.image) {
            user.image = this.getUserImage(user.username)
        }
        user.rank = await getUserRank(user.$id)
        this.user = user
        this.loading.settingLoggedInUser = false
    }

    async getLoggedInUser() {
        this.loading.gettingLoggedInUser = true
        try {
            userStore.setUser(await appwrite.account.get())
        } catch {
            userStore.user = null
        } finally {
            this.loading.gettingLoggedInUser = false
        }
    }

    async logout() {
        this.loading.loggingOutUser = true
        await appwrite.account.deleteSession("current")
        this.user = null
        this.loading.loggingOutUser = false
    }
}

export const getTopTen = async () => {
    const result = await appwrite.databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.orderDesc("highest_round"), Query.notEqual("highest_round", 0)]
    )
    return result.documents
}

export const getUserRank = async (id: string) => {
    const result = await appwrite.databases.listDocuments(
        PUBLIC_APPWRITE_DATABASE_ID,
        PUBLIC_APPWRITE_USERS_COLLECTION_ID,
        [Query.orderDesc("highest_round"), Query.notEqual("highest_round", 0), Query.select(["$id"])]
    )
    return result.documents.findIndex((d, i) => d.$id === id) + 1
}

export const userStore = new UserStore()