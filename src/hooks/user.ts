import { useAuthUser } from "@/stores/auth-store"
import { convexQuery } from "@convex-dev/react-query"
import { api } from "@convex/_generated/api"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
    const user = useAuthUser()
    
    const { data: liveUser } = useQuery({
        ...convexQuery(api.users.get, { id: user!._id }),
        initialData: user,
    })
    return liveUser!
}