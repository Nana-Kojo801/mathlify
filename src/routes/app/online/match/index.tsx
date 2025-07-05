import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import Rapid from './-components/rapid/rapid'

const searchSchema = z.object({
  mode: z.union([z.literal('flow'), z.literal('rapid')]),
})

export const Route = createFileRoute('/app/online/match/')({
  component: RouteComponent,
  validateSearch: searchSchema,
})

function RouteComponent() {
  const searchParam = Route.useSearch()
  return <>{searchParam.mode === 'rapid' && <Rapid />}</>
}
