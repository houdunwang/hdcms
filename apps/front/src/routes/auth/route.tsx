import { HdFooter, HdHeader } from '@hd/react/components'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: '/' })
		}
	},
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<HdHeader menu={<h1>ok</h1>} />
		<div className="container mx-auto p-3 min-h-[calc(100vh-var(--header-height))]">
			<Outlet />
		</div>
		<HdFooter />
	</div>
}
