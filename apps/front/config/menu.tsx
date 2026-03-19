import { ChartPie, CircleHelpIcon, Cog, CommandIcon, Settings2Icon, SquareUserRound, SwatchBook } from "lucide-react";

export const menu = {

	//导航栏点击用户头像时的下拉菜单

	admin: {
		main: [
			{
				title: '网站套餐',
				icon: <CommandIcon />,
				to: '/admin?system=package'
			},
			{
				title: '系统配置',
				icon: <Cog />,
				to: '/admin?system=config'
			},
			{
				title: '用户管理',
				icon: <SquareUserRound />,
				to: '/admin?system=user'
			},
			// {
			// 	title: '兑换会员',
			// 	icon: <Drum />,
			// 	to: '/admin?system=code'
			// },
			{
				title: '网站订阅',
				icon: <ChartPie />,
				to: '/admin?system=subscribe'
			},
			{
				title: '订单管理',
				icon: <SwatchBook />,
				to: '/admin?system=order'
			},

		],
		secondary: [
			{
				title: "视频教程",
				url: "https://www.houdunren.com",
				icon: <Settings2Icon />
			},
			{
				title: "获取帮助",
				url: "https://www.hdcms.com",
				icon: <CircleHelpIcon />
			},
		]
	}
}

