import { HdHeader, useAuth } from '@houdunyun/react'
import { Layout, menuClassName } from '@houdunyun/react/member'
import { createFileRoute, Link, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/member')({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: '/auth/login' })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	const { user } = useAuth()
	return <div>
		<HdHeader menu={<h1>会员中心</h1>} />
		<Layout user={user!}>
			<Link to='/member/a'
				className={menuClassName.default}
				activeProps={{ className: menuClassName.active }}>
				课程
			</Link>
		</Layout>
	</div >
}
