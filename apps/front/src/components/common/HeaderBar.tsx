import { appConfig } from "@/config/app"
import { headerMenus, userDropdownMenus } from "@/config/menus"
import { Header } from "@houdunyun/react/common"
import { UserDropdown } from "@houdunyun/react/user"

export const HeaderBar = () => {
	return (
		<Header
			left={<div className="flex items-center gap-1">
				{appConfig.logo} {appConfig.siteName}
			</div>}
			menus={headerMenus}
			right={<UserDropdown menus={userDropdownMenus} />}
		>
		</Header>
	)
}