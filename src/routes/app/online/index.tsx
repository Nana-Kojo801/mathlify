import { createFileRoute } from '@tanstack/react-router'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Zap } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import RoomTab from './-components/room-tab'
import MatchmakingTab from './-components/matchmaking-tab'

export const Route = createFileRoute('/app/online/')({
  component: OnlinePage,
})

function OnlinePage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <PageHeader title="Online" />

      {/* Main Content */}
      <main className="flex-1 px-4 py-6 flex flex-col gap-6 w-full">
        <Tabs defaultValue="room" className="w-full">
          {/* Clean Tabs */}
          <TabsList className="grid w-full grid-cols-2 mb-6 rounded-lg bg-muted/30 p-1 h-12">
            <TabsTrigger
              value="matchmaking"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <Zap className="w-4 h-4" />
              <span>Quick Match</span>
            </TabsTrigger>
            <TabsTrigger
              value="room"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <Users className="w-4 h-4" />
              <span>Room Browser</span>
            </TabsTrigger>
          </TabsList>

          {/* Room Tab */}
          <TabsContent value="room" className="space-y-6">
            <RoomTab />
          </TabsContent>

          {/* Enhanced Matchmaking Tab */}
          <TabsContent value="matchmaking" className="space-y-6">
            <MatchmakingTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
