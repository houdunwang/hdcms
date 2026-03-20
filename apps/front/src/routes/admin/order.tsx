import { OrderAdminPage } from '#core/order/OrderAdminPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/order')({
	component: RouteComponent,
})

function RouteComponent() {
	return <OrderAdminPage />
}
