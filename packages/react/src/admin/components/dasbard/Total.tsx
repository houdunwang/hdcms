import { BadgeJapaneseYen, BriefcaseBusiness, CircleUser, SquareUser } from 'lucide-react'
import { type JSX } from 'react'

export const Total = (): JSX.Element => {
	const className = 'aspect-video rounded-xl bg-muted/50 flex flex-col justify-center items-center gap-3 text-sm lg:text-base'
	const iconClass = 'text-muted-foreground size-10 lg:size-16'
	return (
		<div className="grid auto-rows-min gap-4 md:grid-cols-4">
			<div className={className} >
				<SquareUser className={iconClass} />
				总用户数：7389人
			</div>
			<div className={className} >
				<CircleUser size={60} className={iconClass} />
				今日访问量：891人
			</div>
			<div className={className} >
				<BadgeJapaneseYen size={60} className={iconClass} />
				本周销售额：891元
			</div>
			<div className={className} >
				<BriefcaseBusiness size={60} className={iconClass} />
				今日销售额：382元
			</div>
		</div>
	)
}
