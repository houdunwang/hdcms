import { Login } from '#core/auth/Login.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
	component: RouteComponent,
})

function RouteComponent() {
	return <Login />
}
