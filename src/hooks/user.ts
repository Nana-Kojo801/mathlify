import { useAuth } from "@/components/auth-provider"
import { convexQuery } from "@convex-dev/react-query"
import { api } from "@convex/_generated/api"
import { useQuery } from "@tanstack/react-query"

export const useUser = () => {
    const { user } = useAuth()
    
    const { data: liveUser } = useQuery({
        ...convexQuery(api.users.get, { id: user!._id }),
        initialData: user,
        enabled: !!user
    })
    return liveUser!
}