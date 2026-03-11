import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/member/example')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div>示例页面</div>
}
