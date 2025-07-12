import { Button } from '@/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { Award, BarChart2 } from 'lucide-react'
import { useCompetition } from '../-hooks'
import { useMutation } from 'convex/react'
import { api } from '@convex/_generated/api'

export function ResultIndicator({ onClose }: { onClose: () => void }) {
  const competition = useCompetition()
  const navigate = useNavigate()
  const viewResult = useMutation(api.competitions.viewResult)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 px-5 bg-black/50">
      <div className="relative w-full max-w-md bg-background rounded-xl shadow-2xl border border-muted overflow-hidden">
        {/* Header */}
        <div className="pt-12 pb-6 px-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Award className="h-7 w-7 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Competition Complete
          </h2>
          <p className="text-muted-foreground">
            The event has concluded. View your final results and standings.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-muted" />

        {/* Action buttons */}
        <div className="p-6 grid grid-cols-2 gap-3">
          <Button
            onClick={() => {
              navigate({
                to: '/app/competition/result/$id',
                params: { id: competition._id },
              })
            }}
            className="h-12 gap-2"
          >
            <BarChart2 className="h-4 w-4" />
            View Results
          </Button>
          <Button
            variant="outline"
            className="h-12 gap-2"
            onClick={() => {
              viewResult({ competitionId: competition._id })
              onClose()
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
