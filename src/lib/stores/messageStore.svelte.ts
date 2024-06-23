import type { Models } from "appwrite"

class MessageStore {
    messages = $state<Models.Document[]>([])

    addMessage(message: Models.Document) {
        this.messages.push(message)
    }
}

export const messageStore = new MessageStore()