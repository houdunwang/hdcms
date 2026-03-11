import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/components/ui/sheet"
import { useAuth, useIsMobile } from '@/hooks'
import type { ILinkItem } from '@/types'
import { Link } from '@tanstack/react-router'
import { House, Settings } from 'lucide-react'
import { useState, type ReactNode } from 'react'
export interface IProps {
	left?: ReactNode
	menus?: ILinkItem[]
	children?: ReactNode
	right?: ReactNode
}
export function Header({ left, children, menus, right }: IProps): React.JSX.Element {
	const isMobile = useIsMobile()
	const { isAdmin } = useAuth()
	return (
		<header className="bg-background/80 backdrop-blur-xl shadow-[0_0_0px_rgba(0,0,0,0.1)]  flex items-center gap-3 justify-between sticky top-0 z-10 h-[var(--header-height)] px-6 lg:px-12">
			<div className="flex items-center gap-1 justify-between flex-1">
				{isMobile ? <MobileMenu menus={menus} children={left} /> : <Link to="/">{left}</Link>}
				{isMobile || <div className="hidden lg:flex justify-start items-center gap-8 flex-1 ml-3">
					{menus?.map((item) => (
						<Link key={item.to} to={item.to} target={item.target}>
							{item.icon && <item.icon />}
							<span>{item.title}</span>
						</Link>
					))}
					{children}
				</div>}
			</div>
			<div className="flex items-center">
				{isAdmin() && <a href="/admin" target="_blank"> <Settings size={18} /></a>}
				{right}
			</div>
		</header>
	)
}


export function MobileMenu({ menus, children }: IProps & { children: ReactNode }): React.JSX.Element {
	const [open, setOpen] = useState(false)
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				{children}
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
