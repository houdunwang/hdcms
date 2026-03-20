import { UserAdminPage } from '#core/user/UserAdminPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/user')({
	component: RouteComponent,
})

function RouteComponent() {
	return <UserAdminPage />
}
