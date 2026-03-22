import { Register } from '#core/auth/register/index'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
	component: RouteComponent,
})

function RouteComponent() {
	return <Register />
}
