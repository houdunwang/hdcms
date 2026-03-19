import type { UserDropMenusType } from "#core/user";
import { LaptopMinimalCheck, Rss, SquareUserRound } from "lucide-react";

export const userDropMenus: UserDropMenusType = [
	{
		label: '会员中心',
		items: [
			{
				title: '资料管理',
				to: '/member/profile',
				icon: SquareUserRound
			},
			{
				title: '帐号绑定',
				to: '/member/bind',
				icon: LaptopMinimalCheck
			}
		],
	},
	{
		label: '社区网站',
		items: [
			{
				title: '后盾人教程',
				to: 'https://www.houdunren.com',
				target: '_blank',
				icon: Rss
			},
		],
	}
] 