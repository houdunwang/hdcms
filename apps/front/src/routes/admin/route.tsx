import { createFileRoute } from '@tanstack/react-router'
import { AdminLayout } from '@houdunyun/react/admin'
import type { RouterContextConfig } from '@houdunyun/react/types'

export const Route = createFileRoute('/admin')({
	beforeLoad() {
		return {
			config: {
				title: '后台管理',
			}
		} as RouterContextConfig
	},
	component: RouteComponent,
})

function RouteComponent() {
	return <AdminLayout />
}
