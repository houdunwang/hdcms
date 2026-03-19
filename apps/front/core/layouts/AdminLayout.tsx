import { Loading } from "#core/common"
import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar"
import { ConfigAdminPage } from "#core/config/ConfigAdminPage"
import { useApi, useAuth, useIsMobile } from "#core/hooks"
import { AppSidebar } from "#core/layouts/admin/app-sidebar"
import { SiteHeader } from "#core/layouts/admin/site-header"
import { OrderAdminPage } from "#core/order/OrderAdminPage"
import { PackageAdminPage } from "#core/package/PackageAdminPage"
import { dasbardStore } from "#core/store/dasbardStore"
import { SubscribeAdminPage } from "#core/subscribe/SubscribeAdminPage"
import { UserAdminPage } from "#core/user/UserAdminPage"
import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router"
import { useAtom } from "jotai"
import { useEffect, type FC } from "react"
import { DasbardAdminPage } from "#core/dasbard/DasbardAdminPage"

export const routes = {
	'/admin?system=user': UserAdminPage,
	'/admin?system=order': OrderAdminPage,
	'/admin?system=subscribe': SubscribeAdminPage,
	'/admin?system=package': PackageAdminPage,
	'/admin?system=config': ConfigAdminPage,
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
	const api = useApi()
	const { isLoading, data } = useQuery(api.admin.queryOptions())
	const [, setDasbardStore] = useAtom(dasbardStore)
	const dasbardData = data as Record<string, any>
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
