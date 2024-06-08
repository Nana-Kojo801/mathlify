import { browser } from "$app/environment"

class OfflineStore {
    offline = $state<boolean>(false)

    constructor() {
        if (browser) {
            window.addEventListener("offline", () => this.offline = true)
            window.addEventListener("online", () => this.offline = false)
        }
    }
}

export const offlineStore = new OfflineStore()