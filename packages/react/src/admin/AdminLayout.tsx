import { AppSidebar } from "@/admin/components/app-sidebar"
import { SiteHeader } from "@/admin/components/site-header"
import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar"
import { Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, type FC } from "react"
import { Dasbard } from "./components/dasbard"
import { useAuth } from "@/hooks"

interface Props {
	width: number,
	height: number
}
export const AdminLayout: FC<Props> = ({ width = 62, height = 12 }) => {
	const matchRoute = useMatchRoute()
	const isAdminHomePage = matchRoute({ to: "/admin", fuzzy: false })
	const { isAdmin } = useAuth()
	const navigate = useNavigate()
	useEffect(() => {
		if (!isAdmin()) {
			navigate({ href: '/auth?action=login' })
		}
	})
	if (!isAdmin()) return null
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": `calc(var(--spacing) * ${width})`,
					"--header-height": `calc(var(--spacing) * ${height})`,
				} as React.CSSProperties
			}
		>
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col p-6">
					{isAdminHomePage ? <Dasbard /> : <Outlet />}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
