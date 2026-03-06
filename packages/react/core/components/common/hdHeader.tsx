
import { Link } from "@tanstack/react-router"
import { MessageCircleCode } from "lucide-react"
import type { ReactNode } from "react"
import { UserDropdown } from "../user/UserDropdown"

export interface IProps {
	login?: ReactNode
	menu: ReactNode
}

export function HdHeader({ login, menu }: IProps) {
	return (
		<header className="bg-background flex items-center gap-3 justify-between sticky top-0 z-10 border-b h-[var(--header-height)] px-6 lg:px-12">
			<div className="flex items-center gap-1">
				<Link to="/" className="flex items-center gap-1">
					{login ?? <>
						<MessageCircleCode />
					</>}
				</Link>
				<div className="hidden lg:flex">
					{menu}
				</div>
			</div>
			<UserDropdown />
		</header>
	)
}