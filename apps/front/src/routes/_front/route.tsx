import { HdFooter, HdHeader } from '@houdunyun/react/components'
import { createFileRoute, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/_front')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<HdHeader menu={<h1>33</h1>} />
		<Outlet />
		<HdFooter />
	</div>
}
