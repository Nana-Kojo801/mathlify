import { createFileRoute } from '@tanstack/react-router'
import {
  Clock,
  Zap,
  Brain,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import CasualTab from './-components/casual/casual-tab'
import SpeedSolveTab from './-components/speed-solve/speed-solve-tab'
import { useTimer } from './-components/useTimer'

export const Route = createFileRoute('/app/competition/')({
  component: CompetitionPage
})

function CompetitionPage() {
  const timeRemaininng = useTimer()

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24)).toString()
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0')
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0')
    return `${days}d ${hours}h ${minutes}m`
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Competition</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="h-7 gap-1.5 px-3">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-sm font-medium">
                Resets in: {formatTime(timeRemaininng)}
              </span>
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 w-full">
        {/* Competition Tabs */}
        <Tabs defaultValue="casual" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2 mb-6 h-11">
            <TabsTrigger value="casual" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Brain className="w-4 h-4" />
              <span>Casual Mode</span>
            </TabsTrigger>
            <TabsTrigger value="speed" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="w-4 h-4" />
              <span>Speed Solve</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="casual">
            <CasualTab />
          </TabsContent>

          <TabsContent value="speed">
            {/* Performance Dashboard */}
            <SpeedSolveTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
