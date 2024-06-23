export const load = async ({ fetch, depends }) => {
    depends("chat:messages")
    const messages = await fetch("/api/getMessages").then(res => res.json());

    return { messages }
};