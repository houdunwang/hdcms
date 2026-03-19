import type { MemberMenusType } from "#core/layouts/MemberLayout.tsx";
import { Dock, Handbag, UserStar } from "lucide-react";

export const memberMenus: MemberMenusType = [
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
]