import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { AdminLayout } from '#core/layouts'
import type { RouterContextConfig } from '#core/types'
import { app } from '#config/app.tsx'
import { adminMenus } from '#config/admin.tsx'

export const Route = createFileRoute('/admin')({
	beforeLoad({ context }) {
		if (!context.auth.isAdmin) {
			throw redirect({ to: '/auth' })
		}
		return {
			config: {
				title: '后台管理',
			}
		} as RouterContextConfig
	},
	component: RouteComponent,
})

function RouteComponent() {
	return <AdminLayout config={app} menus={adminMenus}>
		<Outlet />
	</AdminLayout>
}
