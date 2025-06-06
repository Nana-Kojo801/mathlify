import { createFileRoute, useParams, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Crown, Search, UserPlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useState } from 'react'

export const Route = createFileRoute('/app/online/room/$id/members/')({
  component: MembersComponent,
})

function MembersComponent() {
  const { id } = useParams({ from: '/app/online/room/$id/members/' })
  const [searchQuery, setSearchQuery] = useState('')

  // Mock data - in a real app, you would fetch this from your backend
  const roomData = {
    code: id,
    name: 'Casual Practice Room',
    memberCount: 4,
    members: [
      {
        id: 1,
        name: 'MathWizard',
        avatar: '',
        isOwner: true,
        status: 'online',
        joinedAt: '2 hours ago',
        color: 'text-blue-400',
        stats: {
          gamesPlayed: 24,
          winRate: '68%',
          avgScore: 875,
        },
      },
      {
        id: 2,
        name: 'NumberNinja',
        avatar: '',
        isOwner: false,
        status: 'online',
        joinedAt: '1 hour ago',
        color: 'text-green-400',
        stats: {
          gamesPlayed: 18,
          winRate: '55%',
          avgScore: 762,
        },
      },
      {
        id: 3,
        name: 'CalculusKing',
        avatar: '',
        isOwner: false,
        status: 'online',
        joinedAt: '45 minutes ago',
        color: 'text-purple-400',
        stats: {
          gamesPlayed: 15,
          winRate: '60%',
          avgScore: 803,
        },
      },
      {
        id: 4,
        name: 'AlgebraAce',
        avatar: '',
        isOwner: false,
        status: 'idle',
        joinedAt: '30 minutes ago',
        color: 'text-orange-400',
        stats: {
          gamesPlayed: 21,
          winRate: '52%',
          avgScore: 745,
        },
      },
    ],
  }

  const filteredMembers = roomData.members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="h-dvh bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 mr-1"
              asChild
            >
              <Link to={`/app/online/room/$id`} params={{ id }}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <span className="text-xl font-bold text-primary">Room Members</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1">
              <span>{roomData.members.length} members</span>
            </Badge>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search members..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Members List */}
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-1">
          {/* Render owner first */}
          {filteredMembers
            .filter(member => member.isOwner)
            .map(member => (
              <div
                key={member.id}
                className="flex items-center p-3 rounded-lg hover:bg-accent/10 transition-colors"
              >
                <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                  <AvatarFallback className={`text-xs ${member.color}`}>
                    {member.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className={`font-medium ${member.color}`}>
                      {member.name}
                    </span>
                    <Badge
                      variant="secondary"
                      className="ml-2 gap-0.5 text-[10px] h-4 px-1"
                    >
                      <Crown className="h-2.5 w-2.5" />
                      <span>Host</span>
                    </Badge>
                    <div className="ml-2 h-2 w-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Joined {member.joinedAt}
                  </p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground space-x-3 flex-shrink-0">
                  <div>
                    <span className="font-medium">{member.stats.gamesPlayed}</span> games
                  </div>
                  <div>
                    <span className="font-medium">{member.stats.winRate}</span> win rate
                  </div>
                </div>
              </div>
            ))}

          {/* Render other members */}
          {filteredMembers
            .filter(member => !member.isOwner)
            .map(member => (
              <div
                key={member.id}
                className="flex items-center p-3 rounded-lg hover:bg-accent/10 transition-colors"
              >
                <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
                  <AvatarFallback className={`text-xs ${member.color}`}>
                    {member.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className={`font-medium ${member.color}`}>
                      {member.name}
                    </span>
                    <div className={`ml-2 h-2 w-2 rounded-full ${
                      member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Joined {member.joinedAt}
                  </p>
                </div>
                <div className="flex items-center text-xs text-muted-foreground space-x-3 flex-shrink-0">
                  <div>
                    <span className="font-medium">{member.stats.gamesPlayed}</span> games
                  </div>
                  <div>
                    <span className="font-medium">{member.stats.winRate}</span> win rate
                  </div>
                </div>
              </div>
            ))}

          {filteredMembers.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
              <p>No members found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>

      {/* Invite Button */}
      <div className="p-4 border-t border-border">
        <Button className="w-full" variant="default">
          <UserPlus className="h-4 w-4 mr-2" />
          <span>Invite Friends</span>
        </Button>
      </div>
    </div>
  )
}
