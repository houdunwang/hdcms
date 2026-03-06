import type { LucideIcon } from "lucide-react";

export type ILinkItem = { title: string, to: string, icon?: LucideIcon, target?: '_blank' | '_self' };

export type IUserDropdownMenus = {
	label?: string,
	items: Array<ILinkItem>
}
