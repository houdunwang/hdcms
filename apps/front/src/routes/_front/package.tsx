import { PackageFrontPage } from '#core/package/PackageFrontPage.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_front/package')({
	component: PackageFrontPage
})
