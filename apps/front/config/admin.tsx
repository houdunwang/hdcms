import type { AdminLayoutMenus } from "#core/layouts/AdminLayout.tsx";
import { ChartPie, CircleHelpIcon, Cog, CommandIcon, Settings2Icon, SquareUserRound, SwatchBook } from "lucide-react";

export const adminMenus: AdminLayoutMenus = {
	main: [
		{
			title: '网站套餐',
			icon: CommandIcon,
			to: '/admin/package'
		},
		{
			title: '系统配置',
			icon: Cog,
			to: '/admin/config'
		},
		{
			title: '用户管理',
			icon: SquareUserRound,
			to: '/admin/user'
		},
		// {
		// 	title: '兑换会员',
		// 	icon: <Drum />,
		// 	to: '/admin?system=code'
		// },
		{
			title: '网站订阅',
			icon: ChartPie,
			to: '/admin/subscribe'
		},
		{
			title: '订单管理',
			icon: SwatchBook,
			to: '/admin/order'
		},

	],
	secondary: [
		{
			title: "视频教程",
			to: "https://www.houdunren.com",
			icon: Settings2Icon
		},
		{
			title: "获取帮助",
			to: "https://www.hdcms.com",
			icon: CircleHelpIcon
		},
	]
}

