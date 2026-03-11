import { AppSidebar } from "@/admin/components/app-sidebar"
import { SiteHeader } from "@/admin/components/site-header"
import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar"
import { useAuth } from "@/hooks"
import { Outlet, useMatchRoute, useNavigate, useRouterState } from "@tanstack/react-router"
import { useEffect, useState, type FC } from "react"
import { Dasbard } from "./components/Dasbard"

interface Props {
	width: number,
	height: number
}
export const AdminLayout: FC<Props> = ({ width = 62, height = 12 }) => {
	const { isAdmin } = useAuth()
	const navigate = useNavigate()
	const location = useRouterState({ select: s => s.location })
	const isHomePage = location.pathname === '/admin'
	useEffect(() => {
		if (!isAdmin()) {
			navigate({ href: '/auth?action=login' })
		}
	}, [])
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
					{isHomePage ? <Dasbard /> : <Outlet />}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
