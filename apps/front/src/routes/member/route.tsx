import { HeaderBar } from '@/components/common/HeaderBar'
import { useAuth } from '@houdunyun/react/hooks'
import { MemberLayout } from '@houdunyun/react/member'
import type { ILinkItem } from '@houdunyun/react/types'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Handbag } from 'lucide-react'

export const Route = createFileRoute('/member')({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated(true)) {
			throw redirect({ to: '/auth' })
		}
	},
	component: RouteComponent,
})

const menus = [
	{
		title: '示例页面',
		to: '/member/example',
		icon: Handbag,
	},
] as ILinkItem[]
function RouteComponent() {
	const { user } = useAuth()
	return <div>
		<HeaderBar />
		<MemberLayout user={user!} menus={menus} />
	</div >
}
