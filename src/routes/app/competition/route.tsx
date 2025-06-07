import { createFileRoute, Outlet } from '@tanstack/react-router'
import { fetchCompetitionQuery } from './-components/queries'
import { Loader2 } from 'lucide-react'

export const Route = createFileRoute('/app/competition')({
  component: RouteComponent,
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(fetchCompetitionQuery())
  },
  pendingComponent: () => {
    return (
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  },
})

function RouteComponent() {
  return <Outlet />
}
