import type { Models } from "appwrite"

class MessageStore {
    messages = $state<Models.Document[]>([])

    addMessage(message: Models.Document) {
        this.messages.push(message)
    }

    deleteMessage(id: string) {
        this.messages = this.messages.filter((message: Models.Document) => message.$id !== id)
    }
}

export const messageStore = new MessageStore()