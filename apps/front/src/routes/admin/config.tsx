import { ConfigAdminPage } from '#core/config/ConfigAdminPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/config')({
	component: RouteComponent,
})

function RouteComponent() {
	return <ConfigAdminPage />
}
