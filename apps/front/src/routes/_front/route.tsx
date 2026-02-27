import { createFileRoute, Outlet } from '@tanstack/react-router'
import { menus } from '@/config/menus'
import { HdHeader } from '@core/components/common/hdHeader'
import { HdFooter } from '@core/components/common/HdFooter'
export const Route = createFileRoute('/_front')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<HdHeader menus={menus} />
		<div className="container mx-auto p-3 ">
			<Outlet />
		</div>
		<HdFooter />
	</div>
}
