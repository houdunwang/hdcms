import type { IUserDropdownMenus } from "@houdunyun/react/components";

//导航栏下拉菜单
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