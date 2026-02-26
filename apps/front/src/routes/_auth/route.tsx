import { HdFooter } from '@/components/common/HdFooter'
import { HdHeader } from '@/components/common/hdHeader'
import { menus } from '@/config/menus'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		{/* <HdHeader menus={menus} /> */}
		<div className="container mx-auto p-3 min-h-[calc(100vh-var(--header-height))]">
			<Outlet />
		</div>
		<HdFooter />
	</div>
}
