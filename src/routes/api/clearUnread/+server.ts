export const PATCH = async ({ fetch, locals }) => {
    await fetch(`/api/user/${locals.user?.$id}`, {
        method: "PUT",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ unread_messages: 0 })
    })
    return new Response("Success")
}