import { HeaderBar } from '@/components/HeaderBar'
import { Footer } from '@houdunyun/react/components'
import { createFileRoute, Outlet } from '@tanstack/react-router'
export const Route = createFileRoute('/_front')({
	component: RouteComponent,
})

function RouteComponent() {
	return <div className=''>
		<HeaderBar />
		<Outlet />
		<Footer />
	</div>
}
