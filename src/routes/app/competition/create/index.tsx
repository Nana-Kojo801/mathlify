import { Button } from '@/components/ui/button'
import { api } from '@convex/_generated/api'
import { createFileRoute } from '@tanstack/react-router'
import { useMutation } from 'convex/react'

export const Route = createFileRoute('/app/competition/create/')({
  component: RouteComponent,
})

function RouteComponent() {
  const create = useMutation(api.competitions.create)
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Button
        onClick={async () => {
          await create()
        }}
      >
        Create
      </Button>
    </div>
  )
}
