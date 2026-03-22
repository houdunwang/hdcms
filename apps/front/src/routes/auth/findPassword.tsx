import { FindPassword } from '#core/auth/findPassword/index.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/findPassword')({
	component: RouteComponent,
})

function RouteComponent() {
	return <FindPassword />
}
