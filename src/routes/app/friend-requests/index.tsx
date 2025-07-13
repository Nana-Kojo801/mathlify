import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import { convexQuery } from '@convex-dev/react-query'
import { api } from '@convex/_generated/api'
import { PageHeader } from '@/components/page-header'
import Request from './-components/request'
import FriendRequestsLoading from './-components/friend-requests-skeleton'
import { useMutation } from 'convex/react'
import { useEffect } from 'react'

export const Route = createFileRoute('/app/friend-requests/')({
  component: RouteComponent,
})


function RouteComponent() {
  const { data: requests, isPending: loadingRequests } = useQuery({
    ...convexQuery(api.friendRequests.getReceivedRequests, {}),
    gcTime: 1000 * 60,
    initialData: [],
  })
  const viewRequest = useMutation(api.friendRequests.viewFriendRequests)

  useEffect(() => {
    viewRequest({})
  }, [])

  useEffect(() => {
    if (requests.length === 0) return
    const currentRequest = requests[requests.length - 1]
    if(!currentRequest.viewedByReceiver) viewRequest({})
  }, [requests])

  return (
    <div className="fixed inset-0 z-20 min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <PageHeader title="Requests" showBackButton backLink="/app" />

      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col gap-3">
        {/* Friend Requests List (Mock) */}
        {loadingRequests ? (
          <FriendRequestsLoading />
        ) : (
          <div className="flex flex-col gap-2">
            {requests.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No friend requests yet
              </p>
            )}
            {requests.map((request) => (
              <Request key={request._id} request={request} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
