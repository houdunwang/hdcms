import { PackageAdminPage } from '#core/package/PackageAdminPage.tsx'
import type { RouterContextConfig } from '#core/types/types.ts'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/package')({
	component: RouteComponent,
	beforeLoad: () => {
		return {
			config: {
				title: '网站套餐',
			}
		} as RouterContextConfig
	}
})

function RouteComponent() {
	return <PackageAdminPage />
}
