import { Bind } from '#core/member/bind.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/member/bind')({
	component: RouteComponent,
})

function RouteComponent() {
	return <Bind />
}
