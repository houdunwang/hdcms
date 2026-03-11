import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet"
import { useIsMobile } from '@/hooks'
import type { ILinkItem } from '@/types'
import { UserDropdown } from "@/user"
import { Link } from '@tanstack/react-router'
import { House } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import * as config from '@hdcms/config'
export interface IProps {
	menus?: ILinkItem[]
	children?: ReactNode
}
export function Header({ children, menus }: IProps): React.JSX.Element {
	const isMobile = useIsMobile()
	return (
		<header className="bg-background/80 backdrop-blur-xl shadow-[0_0_0px_rgba(0,0,0,0.1)]  flex items-center gap-3 justify-between sticky top-0 z-10 h-[var(--header-height)] px-6 lg:px-12">
			<div className="flex items-center gap-1 justify-between flex-1">
				{isMobile ? <MobileMenu menus={menus} /> : <Link to="/" className="flex items-center gap-1">
					{config.app.logo}
					{config.app.appName}
				</Link>}
				{isMobile || <div className="hidden lg:flex justify-start items-center gap-8 flex-1 ml-3">
					{config.menu.header?.map((item) => (
						<Link key={item.to} to={item.to} target={item.target || '_self'} activeProps={{
							className: 'text-destructive'
						}}>
							<span>{item.title}</span>
						</Link>
					))}
					{children}
				</div>}
			</div>
			<UserDropdown />
		</header>
	)
}

export function MobileMenu({ menus, }: IProps): React.JSX.Element {
	const [open, setOpen] = useState(false)
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<div className="flex items-center gap-2">
					{config.app.logo}
					{config.app.appName}
				</div>
			</SheetTrigger>
			<SheetContent side='right'>
				<SheetHeader>
					<SheetTitle>
						<Link to="/" className='flex items-center gap-1' onClick={() => setOpen(false)}>
							<House size={18} />网站首页
						</Link>
					</SheetTitle>
					<SheetDescription>
					</SheetDescription>
				</SheetHeader>
				<div className="px-6 space-y-3">
					{menus?.map((item) => (
						<Link key={item.to} to={item.to} target={item.target} className='flex'>
							{item.icon && <item.icon />}
							<span>{item.title}</span>
						</Link>
					))}
				</div>
				{/* <SheetFooter>
					<Button type="submit">Save changes</Button>
					<SheetClose asChild>
						<Button variant="outline">Close</Button>
					</SheetClose>
				</SheetFooter> */}
			</SheetContent>
		</Sheet>
	)
}
