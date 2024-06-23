export const PATCH = async ({ fetch, locals }) => {
    console.log('clearing unread');
    
    await fetch(`/api/user/${locals.user?.$id}`, {
        method: "PUT",
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify({ unread_messages: 0 })
    })
    console.log('done clearing unread');
    return new Response("Success")
}