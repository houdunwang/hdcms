import { Footer, Header } from "@/common"
import { cn } from "@/lib/utils"
import { PackageFrontPage } from "@/package/PackageFrontPage"
import { Outlet, useRouterState } from "@tanstack/react-router"
import { type FC, type PropsWithChildren } from "react"


const systemRoutes = {
	'/front?system=package': <PackageFrontPage />,
}
export const FrontLayout: FC<PropsWithChildren & { className?: string }> = ({ children, className }) => {
	const location = useRouterState({ select: s => s.location })
	const href = location.href
	const systemPageComponent = systemRoutes[href as keyof typeof systemRoutes]
	return (
		<div>
			<Header />
			<div className={cn('container mx-auto mt-12 min-h-[calc(100vh-var(--header-height))]', className)}>
				{children ?? systemPageComponent ?? <Outlet />}
			</div>
			<Footer />
		</div>
	)
}
