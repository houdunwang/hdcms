import { useIsMobile } from '#core/hooks'
import type { AppConfigType, MenuType } from '#core/types'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Link } from '@tanstack/react-router'
import { House } from 'lucide-react'
import { useState, type FC, type ReactNode } from 'react'
export type HeaderMenusType = MenuType[]
export interface HeaderProps {
	config: AppConfigType
	menus?: HeaderMenusType
	right?: ReactNode
	// userDropdown?: UserDropdownProps
}

export const Header: FC<HeaderProps> = (props) => {
	const isMobile = useIsMobile(1024)
	return (
		<header className="bg-background/80 backdrop-blur-xl shadow-[0_0_0px_rgba(0,0,0,0.1)]  flex items-center gap-3 justify-between sticky top-0 z-10 h-[var(--header-height)] px-6 lg:px-12">
			<div className="flex items-center gap-1 justify-between flex-1">
				{isMobile ? <MobileMenu {...props} /> : <PCHeader {...props} />}
			</div>
			{/* <UserDropdown {...props.userDropdown} /> */}
			{props.right}
		</header>
	)
}

export function MobileMenu({ config, menus }: HeaderProps) {
	const [open, setOpen] = useState(false)
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<div className="flex items-center gap-2">
					{config.logo}
					{config.appName}
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
				<div className="px-6 space-y-5">
					{menus?.map((item) => (
						<Link key={item.to} to={item.to} target={item.target} className='flex gap-2 items-center'>
							{item.icon && <item.icon />}
							<span>{item.title}</span>
						</Link>
					))}
				</div>
			</SheetContent>
		</Sheet>
	)
}

export function PCHeader({ config, menus }: HeaderProps) {
	return (
		<>
			<Link to="/" className="flex items-center gap-1">
				{config.logo}
				{config.appName}
			</Link>
			<div className="hidden lg:flex justify-start items-center gap-8 flex-1 ml-3">
				{menus?.map((item) => (
					<Link key={item.to} to={item.to}
						target={item.target || '_self'}
						activeProps={{
							className: 'text-destructive'
						}}>
						<span>{item.title}</span>
					</Link>
				))}
			</div>
		</>
	)
}
