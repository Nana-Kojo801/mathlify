class AuthModalStore {
    openModal = $state()
    type = $state<"signup" | "login">("login")
}

export const authModalStore = new AuthModalStore()