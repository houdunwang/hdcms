import type { IUserDropdownMenus } from "@houdunyun/react/components";

//导航栏下拉菜单
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