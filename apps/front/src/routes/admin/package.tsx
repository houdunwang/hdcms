import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/package')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/admin/package"!!!!!!!</div>
}
