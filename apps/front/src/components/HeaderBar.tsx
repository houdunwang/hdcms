import { Header, type IUserDropdownMenus } from "@houdunyun/react/components"

export const userDropdownMenus = {
	label: '其他菜单',
	items: [
		{
			title: '网站首页',
			to: '/',
		},
		{
			title: '获取帮助',
			to: 'https://www.houdunyun.com',
		},
	],
} as IUserDropdownMenus

export const HeaderBar = () => {
	return (
		<Header menu={<h1></h1>} userDropdownMenus={userDropdownMenus} />

	)
}