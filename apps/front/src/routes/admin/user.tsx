import type { RouterContextConfig } from '#core/types/types.ts'
import { UserAdminPage } from '#core/user/UserAdminPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/user')({
	component: RouteComponent,
	beforeLoad: () => {
		return {
			config: {
				title: '用户管理',
			}
		} as RouterContextConfig
	}
})

function RouteComponent() {
	return <UserAdminPage />
}
