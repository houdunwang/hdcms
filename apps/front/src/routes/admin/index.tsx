import { DasbardAdminPage } from '#core/dasbard/DasbardAdminPage.tsx'
import type { RouterContextConfig } from '#core/types/types.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
	component: RouteComponent,
	beforeLoad: () => {
		return {
			config: {
				title: 'Dasbard',
			}
		} as RouterContextConfig
	}
})

function RouteComponent() {
	return <DasbardAdminPage />
}
