
import { ModeToggle } from "core/components/theme/mode-toggle"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Link } from "@tanstack/react-router"
import { MessageCircleCode } from "lucide-react"
import { toast } from "sonner"

export interface IProps {
	menus: { title: string, to: string, icon?: React.ReactNode }[]
}
export function HdHeader({ menus }: IProps) {
	return (
		<header className="bg-background flex items-center gap-3 justify-between sticky top-0 z-10 border-b h-[var(--header-height)] px-3 lg:px-12">
			<div className="flex items-center gap-1">
				<Link to="/" className="flex items-center gap-1">
					<MessageCircleCode />
					<div className="text-base">houdunren.com</div>
				</Link>
				<div className="hidden lg:flex">
					{menus.slice(0, 5).map((item, index) => (
						<Button variant={'ghost'} key={index}
							className="flex text-sm font-medium text-foreground/80 hover:text-foreground items-center gap-1">
							<Link to={item.to}>{item.title}</Link>
						</Button>
					))}
					<DropdownMenuDemo menus={menus} />
				</div>
			</div>
			<div className="flex gap-2">
				<ModeToggle />
				<Link to="/login" className="flex items-center gap-1">
					<Button variant={'outline'}>登录</Button>
				</Link>
				<Button variant={'default'}>注册</Button>
			</div>
		</header>
	)
}

export function DropdownMenuDemo({ menus }: IProps) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">其他</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-40" align="start">
				<DropdownMenuGroup>
					<DropdownMenuLabel>其他服务</DropdownMenuLabel>
					{menus.slice(5).map((item, index) => (
						<DropdownMenuItem key={index}>{item.title}</DropdownMenuItem>
					))}
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
