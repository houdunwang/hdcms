import { ChartPie, CircleHelpIcon, Clapperboard, Cog, CommandIcon, Dock, Drum, Handbag, LaptopMinimalCheck, Rss, Settings2Icon, SquareUserRound, SwatchBook, UserCheck, UserStar } from "lucide-react";

export const menu = {
	// 网站导航菜单
	header: [
		{
			title: '订阅会员',
			to: '/front?system=package',
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
	user: [
		{
			label: '会员中心',
			items: [
				{
					title: '资料管理',
					to: '/member?system=profile',
					icon: <SquareUserRound />
				},
				{
					title: '帐号绑定',
					to: '/member?system=bind',
					icon: <LaptopMinimalCheck />
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
					icon: <Rss />
				},
			],
		}
	],
	member: [
		{
			title: '资料管理',
			to: '/member?system=profile',
			icon: UserStar
		},
		{
			title: '绑定帐号',
			to: '/member?system=bind',
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
			{
				title: '兑换码',
				icon: <Drum />,
				to: '/admin?system=code'
			},
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

