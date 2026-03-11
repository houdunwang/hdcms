import type { ILinkItem, IUserDropdownMenus } from "@houdunyun/react/types";

// 网站导航菜单
export const headerMenus = [
	{
		title: '订阅会员',
		to: '/front/package',
	},
	{
		title: '视频教程',
		to: 'https://www.houdunren.com',
		target: '_blank',
	},
] as ILinkItem[]

//导航栏点击用户头像时的下拉菜单
export const userDropdownMenus = {
	label: '社区网站',
	items: [
		{
			title: '后盾人教程',
			to: 'https://www.houdunren.com',
			target: '_blank',
		},
	],
} as IUserDropdownMenus