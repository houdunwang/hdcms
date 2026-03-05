import { createFileRoute, Outlet } from '@tanstack/react-router'
import { menus } from '@/config/menus'
import { HdHeader } from '@hd/react/components'
import { HdFooter } from '@hd/react/components'
export const Route = createFileRoute('/_front')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<HdHeader menus={menus} />
		<Outlet />
		<HdFooter />
	</div>
}
