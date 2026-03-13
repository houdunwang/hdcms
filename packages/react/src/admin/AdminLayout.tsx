import { AppSidebar } from "@/admin/components/layout/app-sidebar"
import { SiteHeader } from "@/admin/components/layout/site-header"
import { Loading } from "@/common"
import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar"
import { useApi, useAuth, useIsMobile } from "@/hooks"
import { useQuery } from "@tanstack/react-query"
import { Outlet, useNavigate, useRouterState } from "@tanstack/react-router"
import { useEffect, type FC } from "react"
import { Dasbard } from "./pages/Dasbard"
import { Order } from "./pages/Order"
import { Subscribe } from "./pages/Subscribe"
import { User } from "./pages/User"
import { dasbardStore } from "@/store/dasbardStore"
import { useAtom } from "jotai"

interface Props {
	width: number,
	height: number
}
const routes = {
	'/admin': Dasbard,
	'/admin/user': User,
	'/admin/order': Order,
	'/admin/subscribe': Subscribe
}
export const AdminLayout: FC<Props> = ({ width = 52, height = 12 }) => {
	const isMobile = useIsMobile(1024)
	width = isMobile ? 45 : width
	console.log('isMobile', isMobile)
	const { isAdmin } = useAuth()
	const navigate = useNavigate()
	const location = useRouterState({ select: s => s.location })
	const Component = (routes as unknown as Record<string, React.ComponentType>)[location.pathname] || Dasbard
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
	if (isLoading) return <Loading />
	return (
		<SidebarProvider style={{ "--sidebar-width": `calc(var(--spacing) * ${width})`, "--header-height": `calc(var(--spacing) * ${height})`, } as React.CSSProperties} >
			<AppSidebar variant="inset" />
			<SidebarInset>
				<SiteHeader />
				<div className="flex flex-1 flex-col p-6 min-w-0">
					{Component ? <Component /> : <Outlet />}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
