export const load = async ({ fetch, depends }) => {
    depends("chat:messages")
    await fetch("/api/clearUnread")
    const messages = await fetch("/api/getMessages").then(res => res.json());

    return { messages }
};