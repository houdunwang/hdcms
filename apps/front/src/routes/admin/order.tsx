import { OrderAdminPage } from '#core/order/OrderAdminPage.tsx'
import type { RouterContextConfig } from '#core/types/types.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/order')({
	component: RouteComponent,
	beforeLoad: () => {
		return {
			config: {
				title: '订单管理',
			}
		} as RouterContextConfig
	}
})

function RouteComponent() {
	return <OrderAdminPage />
}
