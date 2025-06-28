import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import {
  fetchRapidQueueStatusQueryOptions,
  fetchActiveRapidMatchQueryOptions,
} from './-components/queries'
import Rapid from './-components/rapid/rapid'
import Spinner from '@/components/spinner'

const searchSchema = z.object({
  mode: z.union([z.literal('flow'), z.literal('rapid')]),
})

export const Route = createFileRoute('/app/online/match/')({
  component: RouteComponent,
  validateSearch: searchSchema,
  pendingComponent: () => {
    return (
      <div className="w-full h-full grid place-content-center">
        <Spinner />
      </div>
    )
  },
  loader: async ({ context: { app, queryClient } }) => {
    const user = app.auth.getState().user
    await Promise.all([
      queryClient.ensureQueryData(fetchRapidQueueStatusQueryOptions(user!._id)),
      queryClient.ensureQueryData(fetchActiveRapidMatchQueryOptions(user!._id)),
    ])
  },
})

function RouteComponent() {
  const searchParam = Route.useSearch()
  return <>{searchParam.mode === 'rapid' && <Rapid />}</>
}
