import type { LucideIcon } from "lucide-react";

export type LinkItem = { title: string, to: string, icon?: LucideIcon, target?: '_blank' | '_self' };

export type UserDropdownMenus = {
	label?: string,
	items: Array<LinkItem>
}
