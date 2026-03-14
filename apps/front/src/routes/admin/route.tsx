import { createFileRoute } from '@tanstack/react-router'
import { AdminLayout } from '@hdcms/react/layouts'
import type { RouterContextConfig } from '@hdcms/react/types'

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
