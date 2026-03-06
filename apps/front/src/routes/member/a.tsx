import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/member/a')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>Hello "/member/a"!</div>
}
