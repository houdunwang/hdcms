import { Footer, Header } from "#core/common"
import { cn } from "@/lib/utils"
import { PackageFrontPage } from "#core/package/PackageFrontPage"
import { Outlet, useRouterState } from "@tanstack/react-router"
import { type FC, type PropsWithChildren } from "react"

const routes = {
	'/front?system=package': <PackageFrontPage />,
}

export const FrontLayout: FC<PropsWithChildren & { className?: string }> = ({ children, className }) => {
	const location = useRouterState({ select: s => s.location })
	const Component = Object.entries(routes).find(([key]) => location.href.includes(key))?.[1]
	return (
		<div>
			<Header />
			<div className={cn('container mx-auto mt-12 min-h-[calc(100vh-var(--header-height))]', className)}>
				{children ?? Component ?? <Outlet />}
			</div>
			<Footer />
		</div>
	)
}
