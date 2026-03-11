import { createFileRoute } from '@tanstack/react-router'
import { AdminLayout } from '@houdunyun/react/admin'

export const Route = createFileRoute('/admin')({
	component: RouteComponent,
})

function RouteComponent() {
	return <AdminLayout />
}
