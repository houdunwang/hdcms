import { AppSidebar } from "@/layouts/admin/app-sidebar"
import { SiteHeader } from "@/layouts/admin/site-header"
import { Loading } from "@/common"
import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar"
import { useApi, useAuth, useIsMobile } from "@/hooks"
import { dasbardStore } from "@/store/dasbardStore"
import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router"
import { useAtom } from "jotai"
import { useEffect, type FC } from "react"
import { DasbardAdminPage } from "../dasbard/DasbardAdminPage"
import { UserAdminPage } from "@/user/UserAdminPage"
import { OrderAdminPage } from "@/order/OrderAdminPage"
import { SubscribeAdminPage } from "@/subscribe/SubscribeAdminPage"
import { PackageAdminPage } from "@/package/PackageAdminPage"

export const routes = {
	'/admin?system=user': UserAdminPage,
	'/admin?system=order': OrderAdminPage,
	'/admin?system=subscribe': SubscribeAdminPage,
	'/admin?system=package': PackageAdminPage,
	'/admin': DasbardAdminPage,
} as Record<string, React.ComponentType>

interface Props {
	width?: number,
	height?: number
}

export const AdminLayout: FC<Props> = ({ width = 52, height = 12 }) => {
	const isMobile = useIsMobile(1024)
	width = isMobile ? 45 : width
	const { isAdmin } = useAuth()
	const navigate = useNavigate()
	const location = useRouterState({ select: s => s.location })
	const Component = Object.entries(routes).find(([key]) => location.href.includes(key))?.[1] || DasbardAdminPage
	const { api } = useApi()
	const { isLoading, data: dasbardData } = useQuery(api.admin.queryOptions())
	const [, setDasbardStore] = useAtom(dasbardStore)
	useEffect(() => {
		if (!isAdmin) {
			navigate({ href: '/auth?action=login' })
		}
		if (dasbardData) {
			setDasbardStore(dasbardData.data)
		}
	}, [dasbardData])
	if (!isAdmin) return null
	if (isLoading) return <Loading screen />
	return (
		<SidebarProvider style={{ "--sidebar-width": `calc(var(--spacing) * ${width})`, "--header-height": `calc(var(--spacing) * ${height})`, } as React.CSSProperties} >
			<AppSidebar variant="inset" />
			<SidebarInset className="min-w-0">
				<SiteHeader />
				<div className="flex flex-1 flex-col p-6 min-w-0">
					{Component ? <Component /> : <Outlet />}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
