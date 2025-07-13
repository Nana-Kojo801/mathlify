import { createFileRoute } from '@tanstack/react-router'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useQuery } from 'convex/react'
import { api } from '@convex/_generated/api'
import Friend from './-components/friend'
import { PageHeader } from '@/components/page-header'

export const Route = createFileRoute('/app/search-users/')({
  component: SearchUsersPage,
})

function SearchUsersPage() {
  const [query, setQuery] = useState('')
  const users = useQuery(api.users.searchUsers, { query }) || []
  const sentRequests =
    useQuery(api.friendRequests.getSentRequests, {}) || []
  const receivedRequest =
    useQuery(api.friendRequests.getReceivedRequests, {}) || []

  return (
    <div className="fixed inset-0 z-20 lg:relative lg:z-0 w-full h-dvh bg-background text-foreground flex flex-col">
      {/* Modern Header */}
      <PageHeader
        title="Search Players"
        showBackButton
        backLink="/app"
        className="border-b border-border/50"
      />

      {/* Search Section */}
      <div className="px-4 py-4 border-b border-border/30 bg-gradient-to-b from-background to-background/95">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by username..."
            className="w-full pl-10 pr-4 py-3 bg-card/50"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        
      </div>

      {/* User List */}
      <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
        {!query && (
          <div className="text-center py-8">
            <Search className="size-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              Start typing to search for other players
            </p>
          </div>
        )}
        
        {query && users.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">
              No users found matching "{query}"
            </p>
          </div>
        )}

        {users.map((user) => (
          <Friend
            key={user._id}
            friend={user}
            sentRequests={sentRequests}
            receivedRequests={receivedRequest}
          />
        ))}
      </div>
    </div>
  )
}
