import { cn } from '@/lib/utils'
import { Link, useRouterState } from "@tanstack/react-router"
import { ChevronRight } from "lucide-react"
import type { JSX } from "react"

export const Breadcrumb = ({ className = '' }: { className?: string }): JSX.Element => {
	const matches = useRouterState({ select: (s) => s.matches })
	const breadcrumbs = [...matches]
		.filter((match) => match.context.config?.title)
		.map(({ pathname, context }) => {
			return <Link to={pathname}>{context.config?.title || ''}</Link>
		})
	return (
		<div className={cn('text-base font-medium flex items-center text-sm font-light', className)}>
			<div>
				<Link to="/" target='_blank'>网站首页</Link>
			</div>
			{breadcrumbs.map((item, index) => {
				return <div key={index} className="flex items-center gap-1 mr-2"><ChevronRight size={16} /> {item} </div>
			})}
		</div>
	)
}
