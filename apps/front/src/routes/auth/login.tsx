import { Login } from '#core/auth/login/index.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/login')({
	component: RouteComponent,
})

function RouteComponent() {
	return <Login />
}
