
import type { IUserDropdownMenus } from "@core/components/types"
import { Link } from "@tanstack/react-router"
import type { ReactNode } from "react"
import { UserDropdown } from "../user/UserDropdown"

export interface IProps {
	login?: ReactNode | string
	menu: ReactNode
	userDropdownMenus?: IUserDropdownMenus
}
export function Header({ login, menu, userDropdownMenus }: IProps) {
	return (
		<header className="bg-background flex items-center gap-3 justify-between sticky top-0 z-10 border-b h-[var(--header-height)] px-6 lg:px-12">
			<div className="flex items-center gap-1 justify-between flex-1">
				<Link to="/" className="flex items-center gap-1"> {login} </Link>
				<div className="hidden lg:flex justify-start items-center gap-8 flex-1">
					{menu}
				</div>
			</div>
			<UserDropdown menus={userDropdownMenus} />
		</header>
	)
}