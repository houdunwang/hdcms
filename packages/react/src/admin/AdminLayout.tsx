import { AppSidebar } from "@/admin/components/app-sidebar"
import { SiteHeader } from "@/admin/components/site-header"
import {
	SidebarInset,
	SidebarProvider,
} from "@/components/ui/sidebar"

import { Outlet, useMatchRoute, useNavigate } from "@tanstack/react-router"
import { useEffect, type FC } from "react"
import { Dasbard } from "./components/dasbard"
import { useAuth } from "@/hooks"

export const AdminLayout: FC = () => {
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
					"--sidebar-width": "calc(var(--spacing) * 72)",
					"--header-height": "calc(var(--spacing) * 12)",
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
