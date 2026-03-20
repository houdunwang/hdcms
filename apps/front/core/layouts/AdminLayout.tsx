import { Loading } from "#core/common"
import { useApi, useIsMobile } from "#core/hooks"
import { AppSidebar } from "#core/layouts/admin/app-sidebar"
import { SiteHeader } from "#core/layouts/admin/site-header"
import { dasbardStore } from "#core/store/dasbardStore"
import type { AppConfigType, MenuType } from "#core/types"
import { SidebarInset, SidebarProvider, } from "@/components/ui/sidebar"
import { useQuery } from "@tanstack/react-query"
import { useSetAtom } from "jotai"
import { useEffect, type ComponentProps, type FC, type PropsWithChildren } from "react"

export type AdminLayoutMenus = {
	main: MenuType[],
	secondary?: MenuType[],
}
export type AdminLayoutProp = ComponentProps<'div'> & PropsWithChildren<{
	config: AppConfigType
	width?: number,
	height?: number
	menus: AdminLayoutMenus
}>

export const AdminLayout: FC<AdminLayoutProp> = ({ width = 52, height = 12, children, ...props }) => {
	const isMobile = useIsMobile(1024)
	width = isMobile ? 45 : width
	const api = useApi()
	const { isLoading, data } = useQuery(api.admin.queryOptions())
	const setDasbardStore = useSetAtom(dasbardStore)
	const dasbardData = data as Record<string, any>
	useEffect(() => {
		if (dasbardData) {
			setDasbardStore(dasbardData.data)
		}
	}, [dasbardData])
	if (isLoading) return <Loading screen />
	return (
		<SidebarProvider style={{ "--sidebar-width": `calc(var(--spacing) * ${width})`, "--header-height": `calc(var(--spacing) * ${height})`, } as React.CSSProperties} >
			<AppSidebar variant={'inset'} {...props} />
			<SidebarInset className="min-w-0">
				<SiteHeader />
				<div className="flex flex-1 flex-col p-6 min-w-0">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	)
}
