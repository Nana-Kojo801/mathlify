import { PUBLIC_APPWRITE_ENDPOINT } from "$env/static/public"

export const getUserImage = (name: string) => {
    return `${PUBLIC_APPWRITE_ENDPOINT}/avatars/initials?name=${name}`
}