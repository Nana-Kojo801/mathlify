import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Plus,
  Search,
  Users,
  Clock,
  Gamepad2,
  RotateCw,
  Share2,
  Filter,
  Sparkles,
  Zap,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export const Route = createFileRoute('/app/online/')({
  component: OnlinePage,
})

function OnlinePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header - Made more compact */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border/40 px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-bold text-primary">
          Online Play
        </h1>
      </header>

      {/* Main Content - Adjusted spacing */}
      <main className="flex-1 px-4 py-4 sm:py-5 flex flex-col gap-5 w-full">
        <Tabs defaultValue="room" className="w-full">
          {/* More compact tabs */}
          <TabsList className="grid w-full grid-cols-3 mb-5 rounded-lg bg-muted/40 p-1 h-10 sm:h-11">
            <TabsTrigger
              value="room"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center justify-center gap-1 transition-all"
            >
              <Users className="w-3.5 h-3.5 hidden sm:inline-block" />
              <span className="whitespace-nowrap">Room</span>
            </TabsTrigger>
            <TabsTrigger
              value="matchmaking"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center justify-center gap-1 transition-all"
            >
              <Zap className="w-3.5 h-3.5 hidden sm:inline-block" />
              <span className="whitespace-nowrap">Matchmaking</span>
            </TabsTrigger>
            <TabsTrigger
              value="recent"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-sm flex items-center justify-center gap-1 transition-all"
            >
              <RotateCw className="w-3.5 h-3.5 hidden sm:inline-block" />
              <span className="whitespace-nowrap">Recent</span>
            </TabsTrigger>
          </TabsList>

          {/* Room Tab - Compacted elements */}
          <TabsContent value="room" className="space-y-6">
            {/* Join by Code - More compact */}
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                <Sparkles className="text-primary w-4 h-4" />
                Join with Code
              </h2>
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Enter room code..."
                  className="bg-muted/30 h-10 rounded-md border-border/50 focus:border-primary/50"
                />
                <Button className="whitespace-nowrap h-10 px-4 font-medium rounded-md">
                  Join
                </Button>
              </div>
              <Button className="gap-1.5 bg-gradient-to-r from-primary to-secondary hover:opacity-90 h-10 w-full rounded-md shadow-sm font-medium">
                <Plus className="w-3.5 h-3.5" />
                Create Room
              </Button>
            </div>

            {/* Divider */}
            <div className="border-b border-border/20"></div>

            {/* Public Rooms List - Compacted */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  Public Rooms
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs sm:text-sm gap-1.5 border-border/50 h-8 px-3 rounded-md"
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Filter</span>
                </Button>
              </div>
              <div className="mb-4 flex items-center gap-1.5 relative">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3" />
                <Input
                  placeholder="Search rooms..."
                  className="bg-muted/30 pl-9 py-5 h-10 rounded-md border-border/50 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2.5 sm:space-y-3">
                {/* Compact Room Items */}
                <div className="rounded-lg bg-muted/15 border border-primary/30 hover:bg-muted/25 transition-colors shadow-sm p-3 sm:p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/30" />
                    <p className="font-medium text-sm sm:text-base">
                      Casual Practice
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      <span>2/4</span>
                    </span>
                    <Button className="gap-1.5 h-8 sm:h-9 text-xs sm:text-sm font-medium rounded-md px-3 sm:px-4">
                      <Users className="w-3.5 h-3.5" />
                      Join
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/15 border border-secondary/30 hover:bg-muted/25 transition-colors shadow-sm p-3 sm:p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/30" />
                    <p className="font-medium text-sm sm:text-base">
                      Speed Challenge
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      <span>1/2</span>
                    </span>
                    <Button className="gap-1.5 h-8 sm:h-9 text-xs sm:text-sm font-medium rounded-md px-3 sm:px-4">
                      <Users className="w-3.5 h-3.5" />
                      Join
                    </Button>
                  </div>
                </div>
                <div className="rounded-lg bg-muted/15 border border-primary/30 hover:bg-muted/25 transition-colors shadow-sm p-3 sm:p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm shadow-green-500/30" />
                    <p className="font-medium text-sm sm:text-base">
                      Daily Tournament Room
                    </p>
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      <span>4/8</span>
                    </span>
                    <Button className="gap-1.5 h-8 sm:h-9 text-xs sm:text-sm font-medium rounded-md px-3 sm:px-4">
                      <Users className="w-3.5 h-3.5" />
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Matchmaking Tab - Compacted */}
          <TabsContent value="matchmaking" className="space-y-6">
            <div>
              <h2 className="text-base sm:text-lg font-semibold mb-2.5 flex items-center gap-2 text-foreground">
                <Zap className="text-primary w-4 h-4" />
                Quick Match
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                Find a match based on your skill level
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-muted/15 border border-primary/40 hover:border-primary/70 rounded-lg p-4 sm:p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:bg-muted/25">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/15 rounded-full flex items-center justify-center shadow-inner">
                    <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">
                    Casual Mode
                  </span>
                  <Badge variant="secondary" className="text-xs py-0.5 px-2">
                    ELO: 1200
                  </Badge>
                </div>
                <div className="bg-muted/15 border border-secondary/40 hover:border-secondary/70 rounded-lg p-4 sm:p-5 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all hover:bg-muted/25">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/15 rounded-full flex items-center justify-center shadow-inner">
                    <Gamepad2 className="w-6 h-6 sm:w-7 sm:h-7 text-secondary" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">
                    Speed Solve
                  </span>
                  <Badge variant="secondary" className="text-xs py-0.5 px-2">
                    ELO: 1150
                  </Badge>
                </div>
              </div>
              <div className="flex items-center justify-center gap-1.5 text-muted-foreground bg-muted/10 py-2 rounded-md shadow-sm text-xs sm:text-sm mt-4">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Average wait time: 30 seconds</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium h-10 mt-4 rounded-md shadow-sm">
                Find Match
              </Button>
            </div>
          </TabsContent>

          {/* Recent Rooms Tab - Compacted */}
          <TabsContent value="recent" className="space-y-6">
            <div>
              <h2 className="text-base sm:text-lg font-semibold mb-2.5 flex items-center gap-2 text-foreground">
                <RotateCw className="text-primary w-4 h-4" />
                Recent Games
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                Quickly rejoin your recent games
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/15 border border-primary/30 hover:bg-muted/25 transition-colors gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-primary/30">
                      <AvatarFallback className="bg-primary/15 text-primary font-medium text-sm">
                        CP
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        Casual Practice Room
                      </p>
                      <div className="flex gap-1.5 items-center mt-1 text-xs text-muted-foreground">
                        <span>Played 2h ago</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>3 players</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end sm:self-auto">
                    <Button
                      variant="outline"
                      className="w-8 h-8 p-0 border-border/60 rounded-md"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button className="text-xs sm:text-sm h-8 gap-1.5 font-medium px-3 sm:px-4 rounded-md">
                      <Users className="w-3.5 h-3.5" />
                      Rejoin
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-muted/15 border border-secondary/30 hover:bg-muted/25 transition-colors gap-3 shadow-sm">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Avatar className="w-10 h-10 sm:w-12 sm:h-12 border border-secondary/30">
                      <AvatarFallback className="bg-secondary/15 text-secondary font-medium text-sm">
                        SC
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm sm:text-base">
                        Speed Challenge
                      </p>
                      <div className="flex gap-1.5 items-center mt-1 text-xs text-muted-foreground">
                        <span>Played 1d ago</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>2 players</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 self-end sm:self-auto">
                    <Button
                      variant="outline"
                      className="w-8 h-8 p-0 border-border/60 rounded-md"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </Button>
                    <Button className="text-xs sm:text-sm h-8 gap-1.5 font-medium px-3 sm:px-4 rounded-md">
                      <Users className="w-3.5 h-3.5" />
                      Rejoin
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
