import { CircleHelpIcon, CommandIcon, Rss, Settings2Icon, SquareUserRound } from "lucide-react";

export const menu = {
	// 网站导航菜单
	header: [
		{
			title: '订阅会员',
			to: '/front/package',
		},
		{
			title: '视频教程',
			to: 'https://www.houdunren.com',
			target: '_blank',
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
	admin: {
		main: [
			{
				title: '订阅套餐',
				icon: <CommandIcon />,
				to: '/admin/package'
			},
			{
				title: '用户管理',
				icon: <SquareUserRound />,
				to: '/admin/user'
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

