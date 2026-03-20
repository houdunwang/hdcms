import { ConfigAdminPage } from '#core/config/ConfigAdminPage.tsx'
import type { RouterContextConfig } from '#core/types/types.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/config')({
	component: RouteComponent,
	beforeLoad: () => {
		return {
			config: {
				title: '系统配置',
			}
		} as RouterContextConfig
	}
})

function RouteComponent() {
	return <ConfigAdminPage />
}
