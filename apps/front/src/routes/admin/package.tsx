import { PackageAdminPage } from '#core/package/PackageAdminPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/package')({
	component: RouteComponent,
})

function RouteComponent() {
	return <PackageAdminPage />
}
