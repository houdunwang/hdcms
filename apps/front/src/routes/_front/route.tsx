import { FooterComponent } from '@/components/FooterComponent'
import { HeaderBar } from '@/components/HeaderBar'
import { createFileRoute, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/_front')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<HeaderBar />
		<Outlet />
		<FooterComponent />
	</div>
}
