import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Copy,
  MessageSquare,
  Trophy,
  ArrowLeft,
  Play,
  Settings,
  Crown,
  BarChart2,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Info,
  ChevronRight,
  Edit,
  Share2,
} from 'lucide-react'

export const Route = createFileRoute('/app/online/room/$id/')({
  component: RoomPage,
})

function RoomPage() {
  const { id } = useParams({ from: '/app/online/room/$id/' })

  // Mock data for the room (would come from API in real implementation)
  const roomData = {
    code: id,
    name: 'Casual Practice Room',
    owner: 'MathWizard',
    memberCount: 4,
    maxMembers: 8,
    gameMode: 'casual',
    settings: {
      numberRange: { min: 1, max: 100 },
      quantity: 10,
      duration: 30,
      timeInterval: 2,
    },
    members: [
      {
        id: 1,
        name: 'MathWizard',
        avatar: '',
        status: 'owner',
        wins: 12,
        losses: 5,
      },
      {
        id: 2,
        name: 'NumberNinja',
        avatar: '',
        status: 'member',
        wins: 8,
        losses: 7,
      },
      {
        id: 3,
        name: 'CalculusKing',
        avatar: '',
        status: 'member',
        wins: 15,
        losses: 3,
      },
      {
        id: 4,
        name: 'AlgebraAce',
        avatar: '',
        status: 'member',
        wins: 6,
        losses: 9,
      },
    ],
    messages: [
      {
        id: 1,
        user: 'MathWizard',
        content: 'Welcome to the room!',
        time: '10:15 AM',
      },
      {
        id: 2,
        user: 'NumberNinja',
        content: 'Hey everyone!',
        time: '10:16 AM',
      },
      {
        id: 3,
        user: 'CalculusKing',
        content: "Let's play some casual games",
        time: '10:17 AM',
      },
      {
        id: 4,
        user: 'MathWizard',
        content: "I've set up some easy rounds to start",
        time: '10:18 AM',
      },
    ],
    leaderboard: [
      { id: 3, name: 'CalculusKing', avatar: '', points: 180 },
      { id: 1, name: 'MathWizard', avatar: '', points: 155 },
      { id: 2, name: 'NumberNinja', avatar: '', points: 120 },
      { id: 4, name: 'AlgebraAce', avatar: '', points: 95 },
    ],
    recentGames: [
      { id: 1, winner: 'CalculusKing', time: '9:45 AM', score: '15/15' },
      { id: 2, winner: 'MathWizard', time: '9:30 AM', score: '14/15' },
      { id: 3, winner: 'CalculusKing', time: '9:15 AM', score: '15/15' },
    ],
    stats: {
      won: 23,
      lost: 14,
      played: 37,
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
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
              <a href="/app/online">
                <ArrowLeft className="h-4 w-4" />
              </a>
            </Button>
            <span className="text-xl font-bold text-primary">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/app/online/room/$id/chat" params={{ id }}>
              <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Chat</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 w-full">
        {/* Room Code Banner */}
        <div className="bg-gradient-to-r from-primary/15 via-primary/5 to-secondary/15 p-5 rounded-xl backdrop-blur-sm border border-primary/20 shadow-md mb-6 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Share2 className="h-5 w-5 text-primary" />
                <p className="text-base font-medium">Room Code</p>
                <Badge variant="secondary" className="text-xs font-normal ml-1">
                  {roomData.memberCount}/{roomData.maxMembers} Players
                </Badge>
              </div>
              <div className="flex items-center gap-3 mb-1">
                <Badge
                  variant="outline"
                  className="text-xl px-4 py-1.5 font-mono bg-background/30 border-primary/20 shadow-sm"
                >
                  {roomData.code}
                </Badge>
                <Button
                  variant="secondary"
                  size="sm"
                  className="gap-1.5 text-xs h-9 px-3 shadow-sm"
                >
                  <Copy className="h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Share this code with friends to join your room
              </p>
            </div>

            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground h-12 gap-2 justify-center shadow-md w-full sm:w-auto sm:px-8">
              <Play className="h-5 w-5" />
              <span className="font-medium">Start Game</span>
            </Button>
          </div>
        </div>

        {/* Performance Dashboard */}
        <div className="flex flex-col space-y-6 mb-6 w-full">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <StatCard
              icon={<CheckCircle className="w-5 h-5 text-green-400" />}
              title="Games Won"
              value={roomData.stats.won}
              description="Victories in this room"
              colorClass="text-green-500"
              className="flex-1"
              iconBgClass="bg-green-500/10"
            />
            <StatCard
              icon={<XCircle className="w-5 h-5 text-red-400" />}
              title="Games Lost"
              value={roomData.stats.lost}
              description="Defeats in this room"
              colorClass="text-red-500"
              className="flex-1"
              iconBgClass="bg-red-500/10"
            />
            <StatCard
              icon={<Clock className="w-5 h-5 text-blue-400" />}
              title="Games Played"
              value={roomData.stats.played}
              description="Total matches completed"
              colorClass="text-blue-500"
              className="flex-1"
              iconBgClass="bg-blue-500/10"
            />
          </div>
        </div>

        {/* Room Details */}
        <Card className="bg-card/60 backdrop-blur-sm shadow-md mb-6 w-full border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <CardHeader className="pb-2 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Info className="w-5 h-5 text-primary" />
                <span>Room Details</span>
              </CardTitle>
              <Link to="/app/online/room/$id/members" params={{ id }}>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <Users className="w-4 h-4" />
                  <span className="hidden sm:inline">View Members</span>
                </Button>
              </Link>
            </div>
            <CardDescription>Information about this room</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Members</p>
                </div>
                <p className="text-sm font-medium">
                  {roomData.memberCount}/{roomData.maxMembers}
                </p>
              </div>
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Crown className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Host</p>
                </div>
                <p className="text-sm font-medium">{roomData.owner}</p>
              </div>
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Game Mode</p>
                </div>
                <p className="text-sm font-medium capitalize">
                  {roomData.gameMode}
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-3.5 w-3.5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">Duration</p>
                </div>
                <p className="text-sm font-medium">
                  {roomData.settings.duration} seconds
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Game Settings */}
        <Card className="bg-card/60 backdrop-blur-sm shadow-md mb-6 w-full border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
          <CardHeader className="pb-2 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Settings className="w-5 h-5 text-primary" />
                <span>Game Settings</span>
              </CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit Settings</span>
              </Button>
            </div>
            <CardDescription>
              Current configuration for gameplay
            </CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <p className="text-sm font-medium">Number Range</p>
                <Badge
                  variant="outline"
                  className="font-mono bg-background/30 text-xs"
                >
                  {roomData.settings.numberRange.min} -{' '}
                  {roomData.settings.numberRange.max}
                </Badge>
              </div>
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <p className="text-sm font-medium">Quantity</p>
                <Badge
                  variant="outline"
                  className="font-mono bg-background/30 text-xs"
                >
                  {roomData.settings.quantity} numbers
                </Badge>
              </div>
              <div className="flex items-center justify-between border-b border-border/30 pb-3">
                <p className="text-sm font-medium">Duration</p>
                <Badge
                  variant="outline"
                  className="font-mono bg-background/30 text-xs"
                >
                  {roomData.settings.duration} seconds
                </Badge>
              </div>
              <div className="flex items-center justify-between pt-1">
                <p className="text-sm font-medium">Time Interval</p>
                <Badge
                  variant="outline"
                  className="font-mono bg-background/30 text-xs"
                >
                  {roomData.settings.timeInterval} seconds
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Games */}
        <Card className="bg-card/60 backdrop-blur-sm shadow-md mb-6 w-full border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
          <CardHeader className="pb-2 relative">
            <CardTitle className="text-lg flex items-center space-x-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              <span>Recent Games</span>
            </CardTitle>
            <CardDescription>Latest matches in this room</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-2 relative z-10">
            {roomData.recentGames.map((game) => (
              <div
                key={game.id}
                className="flex items-center justify-between p-3 bg-background/30 rounded-lg shadow-sm border border-border/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-yellow-500/10 flex items-center justify-center">
                    <Crown className="h-3.5 w-3.5 text-yellow-500" />
                  </div>
                  <span className="text-sm font-medium">{game.winner}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline" className="text-xs bg-background/40">
                    {game.score}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {game.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter className="pt-0 relative z-10">
            <Button variant="ghost" size="sm" className="w-full text-xs">
              View All Games
              <ChevronRight className="ml-1 h-3 w-3" />
            </Button>
          </CardFooter>
        </Card>

        {/* Leaderboard Preview */}
        <Card className="bg-card/60 backdrop-blur-sm shadow-md w-full border-border/50 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <CardHeader className="pb-2 relative">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-primary" />
                <span>Leaderboard</span>
              </CardTitle>
              <Link to='/app/online/room/$id/leaderboard' params={{ id }}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1"
                  onClick={() => {}}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="hidden sm:inline">View Full</span>
                </Button>
              </Link>
            </div>
            <CardDescription>Top players in this room</CardDescription>
          </CardHeader>
          <CardContent className="p-0 relative z-10">
            <div className="divide-y divide-border/30">
              {roomData.leaderboard.slice(0, 3).map((player, index) => (
                <div
                  key={player.id}
                  className="flex items-center p-4 hover:bg-background/20"
                >
                  <div className="w-8 h-8 rounded-full flex justify-center items-center mr-2">
                    <span
                      className={`text-sm font-bold ${
                        index === 0
                          ? 'text-yellow-400'
                          : index === 1
                            ? 'text-slate-300'
                            : 'text-amber-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-3">
                    <Avatar className="h-9 w-9 border-2 border-background/50">
                      <AvatarImage src={player.avatar} />
                      <AvatarFallback className="text-xs bg-primary/10">
                        {player.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium">{player.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        index === 0
                          ? 'default'
                          : index === 1
                            ? 'secondary'
                            : 'outline'
                      }
                      className="text-xs font-mono px-2.5 py-1"
                    >
                      {player.points} pts
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-card/60 p-3 text-center">
              <Button variant="ghost" size="sm" className="text-xs w-full">
                View Full Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

// Reusable stat card component
function StatCard({
  icon,
  title,
  value,
  description,
  colorClass,
  className,
  iconBgClass,
}: {
  icon: React.ReactNode
  title: string
  value: string | number
  description: string
  colorClass?: string
  className?: string
  iconBgClass?: string
}) {
  return (
    <Card
      className={`bg-card/60 backdrop-blur-sm shadow-md relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
      <CardContent className="pt-4 pb-3 relative z-10">
        <div className="flex items-center space-x-3 mb-2">
          <div
            className={`p-1.5 rounded-full ${iconBgClass || 'bg-primary/10'}`}
          >
            {icon}
          </div>
          <h4 className="font-medium">{title}</h4>
        </div>
        <p className={`text-2xl font-bold mb-1 ${colorClass}`}>{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
