import type { HeaderMenusType } from "#core/common";
import { Clapperboard, UserCheck } from "lucide-react";

// 网站导航菜单
export const headerMenus: HeaderMenusType = [
	{
		title: '订阅会员',
		to: '/package',
		icon: UserCheck
	},
	{
		title: '视频教程',
		to: 'https://www.houdunren.com',
		target: '_blank',
		icon: Clapperboard
	},
] 