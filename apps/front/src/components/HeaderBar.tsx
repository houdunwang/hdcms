import { appConfig } from "@/config/app"
import { headerMenus } from "@/config/headerMenu"
import { userDropdownMenus } from "@/config/userDropdownMenus"
import { Header, UserDropdown } from "@houdunyun/react/components"
import { Link } from "@tanstack/react-router"

export const HeaderBar = () => {

	return (
		<Header
			left={<Link to="/" className="flex items-center gap-1"> {appConfig.logo} {appConfig.siteName}</Link>}
			right={<UserDropdown menus={userDropdownMenus} />}
		>
			<div className="flex items-center gap-6 ml-3">
				{headerMenus.map((item) => (
					<Link key={item.title} to={item.to}>{item.title}</Link>
				))}
			</div>
		</Header>
	)
}