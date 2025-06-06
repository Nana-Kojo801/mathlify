import { createFileRoute, useParams, Link } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, ArrowUp, ArrowDown, Minus, Crown, Medal, Trophy } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const Route = createFileRoute('/app/online/room/$id/leaderboard/')({
  component: LeaderboardComponent,
})

function LeaderboardComponent() {
  const { id } = useParams({ from: '/app/online/room/$id/leaderboard/' })

  // Mock data - in a real app, you would fetch this from your backend
  const leaderboardData = {
    code: id,
    name: 'Casual Practice Room',
    stats: {
      gamesPlayed: {
        total: 12,
        casual: 8,
        speedSolve: 4
      },
      totalProblems: 360,
      avgScore: 784,
    },
    standings: {
      overall: [
        {
          id: 1,
          rank: 1,
          name: 'MathWizard',
          avatar: '',
          isOwner: true,
          color: 'text-blue-400',
          stats: {
            score: 895,
            wins: 8,
            gamesPlayed: 12,
            trend: 'same',
            winRate: '67%',
            avgTime: '4.2s',
          },
        },
        {
          id: 2,
          rank: 2,
          name: 'CalculusKing',
          avatar: '',
          isOwner: false,
          color: 'text-purple-400',
          stats: {
            score: 842,
            wins: 3,
            gamesPlayed: 11,
            trend: 'up',
            winRate: '27%',
            avgTime: '5.1s',
          },
        },
        {
          id: 3,
          rank: 3,
          name: 'NumberNinja',
          avatar: '',
          isOwner: false,
          color: 'text-green-400',
          stats: {
            score: 810,
            wins: 1,
            gamesPlayed: 10,
            trend: 'down',
            winRate: '10%',
            avgTime: '5.8s',
          },
        },
        {
          id: 4,
          rank: 4,
          name: 'AlgebraAce',
          avatar: '',
          isOwner: false,
          color: 'text-orange-400',
          stats: {
            score: 768,
            wins: 0,
            gamesPlayed: 9,
            trend: 'same',
            winRate: '0%',
            avgTime: '6.3s',
          },
        },
      ],
      casual: [
        {
          id: 1,
          rank: 1,
          name: 'MathWizard',
          avatar: '',
          isOwner: true,
          color: 'text-blue-400',
          stats: {
            score: 860,
            wins: 5,
            gamesPlayed: 8,
            trend: 'same',
            winRate: '63%',
            avgTime: '5.2s',
          },
        },
        {
          id: 2,
          rank: 2,
          name: 'NumberNinja',
          avatar: '',
          isOwner: false,
          color: 'text-green-400',
          stats: {
            score: 825,
            wins: 3,
            gamesPlayed: 8,
            trend: 'up',
            winRate: '38%',
            avgTime: '5.8s',
          },
        },
        {
          id: 3,
          rank: 3,
          name: 'CalculusKing',
          avatar: '',
          isOwner: false,
          color: 'text-purple-400',
          stats: {
            score: 782,
            wins: 0,
            gamesPlayed: 7,
            trend: 'down',
            winRate: '0%',
            avgTime: '6.0s',
          },
        },
        {
          id: 4,
          rank: 4,
          name: 'AlgebraAce',
          avatar: '',
          isOwner: false,
          color: 'text-orange-400',
          stats: {
            score: 740,
            wins: 0,
            gamesPlayed: 5,
            trend: 'same',
            winRate: '0%',
            avgTime: '6.5s',
          },
        },
      ],
      speedSolve: [
        {
          id: 1,
          rank: 1,
          name: 'CalculusKing',
          avatar: '',
          isOwner: false,
          color: 'text-purple-400',
          stats: {
            score: 910,
            wins: 3,
            gamesPlayed: 4,
            trend: 'up',
            winRate: '75%',
            avgTime: '3.1s',
          },
        },
        {
          id: 2,
          rank: 2,
          name: 'MathWizard',
          avatar: '',
          isOwner: true,
          color: 'text-blue-400',
          stats: {
            score: 895,
            wins: 1,
            gamesPlayed: 4,
            trend: 'down',
            winRate: '25%',
            avgTime: '3.5s',
          },
        },
        {
          id: 3,
          rank: 3,
          name: 'AlgebraAce',
          avatar: '',
          isOwner: false,
          color: 'text-orange-400',
          stats: {
            score: 822,
            wins: 0,
            gamesPlayed: 4,
            trend: 'up',
            winRate: '0%',
            avgTime: '4.2s',
          },
        },
        {
          id: 4,
          rank: 4,
          name: 'NumberNinja',
          avatar: '',
          isOwner: false,
          color: 'text-green-400',
          stats: {
            score: 795,
            wins: 0,
            gamesPlayed: 2,
            trend: 'same',
            winRate: '0%',
            avgTime: '4.8s',
          },
        },
      ],
    },
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-4 w-4 text-yellow-500" />
      case 2:
        return <Medal className="h-4 w-4 text-slate-400" />
      case 3:
        return <Medal className="h-4 w-4 text-amber-700" />
      default:
        return <span className="text-muted-foreground">{rank}</span>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="h-4 w-4 text-green-500" />
      case 'down':
        return <ArrowDown className="h-4 w-4 text-red-500" />
      case 'same':
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getGameTypeLabel = (type: string) => {
    switch (type) {
      case 'overall':
        return 'Overall';
      case 'casual':
        return 'Casual Games';
      case 'speedSolve':
        return 'Speed Solve';
      default:
        return type;
    }
  }

  const getGameCountLabel = (type: string) => {
    switch (type) {
      case 'overall':
        return leaderboardData.stats.gamesPlayed.total;
      case 'casual':
        return leaderboardData.stats.gamesPlayed.casual;
      case 'speedSolve':
        return leaderboardData.stats.gamesPlayed.speedSolve;
      default:
        return 0;
    }
  }

  const renderLeaderboard = (data: typeof leaderboardData.standings.overall) => (
    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Score</TableHead>
            <TableHead className="text-right hidden sm:table-cell">Wins</TableHead>
            <TableHead className="text-right hidden md:table-cell">Win Rate</TableHead>
            <TableHead className="text-right hidden md:table-cell">Avg Time</TableHead>
            <TableHead className="text-center w-12">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((player) => (
            <TableRow key={player.id} className="[&>td]:py-2.5">
              <TableCell className="text-center">
                {getRankIcon(player.rank)}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Avatar className="h-7 w-7 sm:h-8 sm:w-8 mr-2">
                    <AvatarFallback className={`text-xs ${player.color}`}>
                      {player.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center">
                      <span className={`font-medium truncate max-w-[100px] sm:max-w-none ${player.color}`}>
                        {player.name}
                      </span>
                      {player.isOwner && (
                        <Badge
                          variant="secondary"
                          className="ml-1.5 h-4 text-[10px] px-1"
                        >
                          <Crown className="h-2.5 w-2.5 mr-0.5" />
                          <span className="hidden xs:inline">Host</span>
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-medium">
                {player.stats.score}
              </TableCell>
              <TableCell className="text-right hidden sm:table-cell">{player.stats.wins}</TableCell>
              <TableCell className="text-right hidden md:table-cell">{player.stats.winRate}</TableCell>
              <TableCell className="text-right hidden md:table-cell">{player.stats.avgTime}</TableCell>
              <TableCell className="text-center">
                {getTrendIcon(player.stats.trend)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="h-dvh bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-9 sm:w-9 mr-1"
              asChild
            >
              <Link to={`/app/online/room/$id`} params={{ id }}>
                <ArrowLeft className="h-4 w-4" />
              </Link>
            </Button>
            <span className="text-lg sm:text-xl font-bold text-primary">Leaderboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 text-xs sm:text-sm h-6 px-2">
              <span>{leaderboardData.stats.gamesPlayed.total} games</span>
            </Badge>
          </div>
        </div>
      </header>

      {/* Tabs and Content */}
      <div className="flex-grow flex flex-col overflow-hidden">
        <Tabs defaultValue="overall" className="h-full flex flex-col">
          <div className="border-b border-border">
            <TabsList className="w-full h-11 sm:h-12 rounded-none bg-transparent justify-center">
              <TabsTrigger 
                value="overall" 
                className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none px-0 sm:px-2 text-xs sm:text-sm h-full"
              >
                Overall
              </TabsTrigger>
              <TabsTrigger 
                value="casual" 
                className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none px-0 sm:px-2 text-xs sm:text-sm h-full"
              >
                Casual
              </TabsTrigger>
              <TabsTrigger 
                value="speedSolve" 
                className="flex-1 data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none data-[state=active]:bg-transparent rounded-none px-0 sm:px-2 text-xs sm:text-sm h-full"
              >
                Speed Solve
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="flex-grow overflow-auto p-3 sm:p-4">
            {['overall', 'casual', 'speedSolve'].map((type) => (
              <TabsContent key={type} value={type} className="mt-0 h-full">
                <div className="mb-3 sm:mb-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-base sm:text-lg font-medium">{getGameTypeLabel(type)}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {getGameCountLabel(type)} games played
                      </p>
                    </div>
                   
                    {/* Trophy icons for the current category - desktop only */}
                    <div className="hidden md:flex items-center gap-6">
                      <div className="flex flex-col items-center">
                        <Trophy className="h-6 w-6 text-yellow-500 mb-1" />
                        <span className="text-xs text-muted-foreground">1st Place</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Medal className="h-6 w-6 text-slate-400 mb-1" />
                        <span className="text-xs text-muted-foreground">2nd Place</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <Medal className="h-6 w-6 text-amber-700 mb-1" />
                        <span className="text-xs text-muted-foreground">3rd Place</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Legend for mobile only - above table */}
                <div className="flex sm:hidden justify-center gap-8 mb-3">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    <span className="text-xs text-muted-foreground">1st</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Medal className="h-4 w-4 text-slate-400" />
                    <span className="text-xs text-muted-foreground">2nd</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Medal className="h-4 w-4 text-amber-700" />
                    <span className="text-xs text-muted-foreground">3rd</span>
                  </div>
                </div>
                
                {/* Enhanced Leaderboard */}
                {renderLeaderboard(leaderboardData.standings[type as keyof typeof leaderboardData.standings])}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </div>
  )
}
