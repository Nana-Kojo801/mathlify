import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/online/room/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="fixed inset-0 w-full bg-background z-20 overflow-y-auto">
      <Outlet />
    </div>
  )
}
