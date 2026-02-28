import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/a')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_front/a"!</div>
}
