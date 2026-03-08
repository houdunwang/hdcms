import { headerConfig } from "@/config/headerMenu"
import { userDropdownMenus } from "@/config/userDropdownMenus"
import { Header } from "@houdunyun/react/components"

export const HeaderBar = () => {
	return (
		<Header login={headerConfig.logo} menu={headerConfig.menus} userDropdownMenus={userDropdownMenus} />
	)
}