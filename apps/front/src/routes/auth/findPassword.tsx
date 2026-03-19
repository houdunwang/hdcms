import { FindPassword } from '#core/auth/FindPassword.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/findPassword')({
	component: RouteComponent,
})

function RouteComponent() {
	return <FindPassword />
}
