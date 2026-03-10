import type { ILinkItem, IUserDropdownMenus } from "@houdunyun/react/types";

// 网站导航菜单
export const headerMenus = [
	{
		title: '订阅会员',
		to: '/front/subscribe',
		target: '_blank',
	},
	{
		title: '订阅网站',
		to: 'https://www.houdunyun.com',
	},
] as ILinkItem[]

//导航栏点击用户头像时的下拉菜单
export const userDropdownMenus = {
	label: '社区网站',
	items: [
		{
			title: '后盾云软件',
			to: 'https://www.houdunyun.com',
		},
		{
			title: '后盾人教程',
			to: 'https://www.houdunren.com',
		},
	],
} as IUserDropdownMenus