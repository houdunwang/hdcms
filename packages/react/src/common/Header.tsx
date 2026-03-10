
import type { ReactNode } from "react"

export interface IProps {
	left?: ReactNode
	children: ReactNode
	right?: ReactNode
}
export function Header({ left, children, right }: IProps) {
	return (
		<header className="bg-background flex items-center gap-3 justify-between sticky top-0 z-10 border-b h-[var(--header-height)] px-6 lg:px-12">
			<div className="flex items-center gap-1 justify-between flex-1">
				{left}
				<div className="hidden lg:flex justify-start items-center gap-8 flex-1">
					{children}
				</div>
			</div>
			{right}
		</header>
	)
}