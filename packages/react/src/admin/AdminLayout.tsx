import { AppSidebar } from "@/admin/components/layout/app-sidebar"
import { SiteHeader } from "@/admin/components/layout/site-header"
import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar"
import { useAuth } from "@/hooks"
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router"
import { useEffect, type FC } from "react"
import { Dasbard } from "./pages/Dasbard"
import { User } from "./pages/User"
import { Order } from "./pages/Order"

interface Props {
	width: number,
	height: number
}
const routes = {
	'/admin': Dasbard,
	'/admin/user': User,
	'/admin/order': Order
}
export const AdminLayout: FC<Props> = ({ width = 62, height = 12 }) => {
	const { isAdmin } = useAuth()
	const navigate = useNavigate()
	const location = useRouterState({ select: s => s.location })
	const Component = (routes as unknown as Record<string, React.ComponentType>)[location.pathname] || Dasbard
	console.log('location.pathname', location.pathname)
	useEffect(() => {
		if (!isAdmin()) {
			navigate({ href: '/auth?action=login' })
		}
	}, [])
	if (!isAdmin()) return null
	return (
		<SidebarProvider style={{ "--sidebar-width": `calc(var(--spacing) * ${width})`, "--header-height": `calc(var(--spacing) * ${height})`, } as React.CSSProperties} >
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col p-6">
					{Component ? <Component /> : <Outlet />}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
