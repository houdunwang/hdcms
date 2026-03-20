import { SubscribeAdminPage } from '#core/subscribe/SubscribeAdminPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/subscribe')({
	component: RouteComponent,
})

function RouteComponent() {
	return <SubscribeAdminPage />
}
