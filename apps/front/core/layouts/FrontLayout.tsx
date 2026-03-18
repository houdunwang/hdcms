import { Footer, Header } from "../common"
import { cn } from "../components/lib/utils"
import { PackageFrontPage } from "../package/PackageFrontPage"
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
