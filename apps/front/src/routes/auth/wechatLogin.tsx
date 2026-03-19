import { WechatLogin } from '#core/auth/WechatLogin.tsx'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/wechatLogin')({
	component: RouteComponent,
})

function RouteComponent() {
	return <WechatLogin />
}
