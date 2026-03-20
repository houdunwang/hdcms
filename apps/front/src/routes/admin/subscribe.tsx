import { SubscribeAdminPage } from '#core/subscribe/SubscribeAdminPage.tsx'
import type { RouterContextConfig } from '#core/types/types.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/subscribe')({
	component: RouteComponent,
	beforeLoad: () => {
		return {
			config: {
				title: '网站订阅',
			}
		} as RouterContextConfig
	}
})

function RouteComponent() {
	return <SubscribeAdminPage />
}
