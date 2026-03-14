import { Footer, Header } from "@/common"
import { useIsMobile } from "@/hooks"
import { Outlet } from "@tanstack/react-router"
import { type FC } from "react"

interface Props {
}

export const FrontLayout: FC<Props> = ({ }) => {
	const isMobile = useIsMobile(1024)
	return (
		<>
			<Header />
			<div className="container mx-auto mt-12 min-h-[calc(100vh-var(--header-height))]">
				<Outlet />
			</div>
			<Footer />
		</>
	)
}
