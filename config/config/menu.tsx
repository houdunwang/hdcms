import { ChartPie, CircleHelpIcon, Clapperboard, CommandIcon, Dock, Drum, Handbag, MonitorPlay, Rss, Settings2Icon, SquareUserRound, SquareUserRoundIcon, SwatchBook, User, UserCheck, UserStar, Video, Youtube } from "lucide-react";

export const menu = {
	// 网站导航菜单
	header: [
		{
			title: '订阅会员',
			to: '/front/package',
			icon: <UserCheck size={16} />
		},
		{
			title: '视频教程',
			to: 'https://www.houdunren.com',
			target: '_blank',
			icon: <Clapperboard size={16} />
		},
	],
	//导航栏点击用户头像时的下拉菜单
	user: {
		label: '社区网站',
		items: [
			{
				title: '后盾人教程',
				to: 'https://www.houdunren.com',
				target: '_blank',
				icon: <Rss />
			},
		],
	},
	member: [
		{
			title: '资料管理',
			to: '/member/profile',
			icon: UserStar
		},
		{
			title: '绑定帐号',
			to: '/member/bind',
			icon: Dock
		},
		{
			title: '示例页面',
			to: '/member/example',
			icon: Handbag,
		},
	],
	admin: {
		main: [
			{
				title: '网站套餐',
				icon: <CommandIcon />,
				to: '/admin/package'
			},
			{
				title: '用户管理',
				icon: <SquareUserRound />,
				to: '/admin/user'
			},
			{
				title: '兑换码',
				icon: <Drum />,
				to: '/admin/code'
			},
			{
				title: '网站订阅',
				icon: <ChartPie />,
				to: '/admin/subscribe'
			},
			{
				title: '订单管理',
				icon: <SwatchBook />,
				to: '/admin/order'
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

