import { CommandIcon } from "lucide-react";

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
			},
		],
	},
	admin: [
		{
			title: '套餐管理',
			icon: <CommandIcon />,
			to: '/admin/package'
		},
	]
}

