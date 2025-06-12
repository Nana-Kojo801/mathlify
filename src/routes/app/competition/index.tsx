import { createFileRoute } from '@tanstack/react-router'
import { Clock, Zap, Brain } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import FlowTab from './-components/flow/flow-tab'
import RapidTab from './-components/rapid/rapid-tab'
import { useShouldShowResult, useTimer } from './-components/hooks'
import { ResultIndicator } from './-components/result-indicator'
import { useState } from 'react'
import { PageHeader } from '@/components/page-header'

export const Route = createFileRoute('/app/competition/')({
  component: CompetitionPage,
})

export function CompetitionPage() {
  const timeRemaininng = useTimer()
  const shouldShowResult = useShouldShowResult()
  const [showResult, setShowResult] = useState(shouldShowResult)

  const formatTime = (time: number) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24)).toString()
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, '0')
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0')
    return `${days}d ${hours}h ${minutes}m`
  }

  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex flex-col relative">
        
        <PageHeader
          title="Competition"
          rightContent={
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="h-7 gap-1.5 px-3">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-sm font-medium">
                  Resets in: {formatTime(timeRemaininng)}
                </span>
              </Badge>
            </div>
          }
        />
        {/* Main Content */}
        <main className="flex-1 p-4 w-full">
          {/* Competition Tabs */}
          <Tabs defaultValue="flow" className="w-full mb-6">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-11">
              <TabsTrigger
                value="flow"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Brain className="w-4 h-4" />
                <span>Flow</span>
              </TabsTrigger>
              <TabsTrigger
                value="rapid"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Zap className="w-4 h-4" />
                <span>Rapid</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="flow">
              <FlowTab />
            </TabsContent>

            <TabsContent value="rapid">
              <RapidTab />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {showResult && <ResultIndicator onClose={() => setShowResult(false)} />}
    </>
  )
}
