import { cn } from '@/lib/utils'
import { dasbardAtom } from '#core/store/dasbardAtom.ts'
import { useAtomValue } from 'jotai'
import { BadgeJapaneseYen, BriefcaseBusiness, CircleUser, SquareUser, UserStar } from 'lucide-react'
import { type JSX } from 'react'

export const Total = (): JSX.Element => {
	const dasbardData = useAtomValue(dasbardAtom)
	const className = 'aspect-video rounded-xl bg-muted/50 text-muted-foreground flex flex-col justify-center items-center gap-3 text-sm lg:text-base'
	const iconClass = 'text-muted-foreground size-10 lg:size-8 opacity-80'
	return (
		<div className="grid auto-rows-min gap-1 lg:gap-4 grid-cols-3 lg:grid-cols-5">
			<div className={className}>
				<SquareUser className={iconClass} />
				总用户：{dasbardData?.totalUsersCount}人
			</div>
			<div className={cn(className, 'hidden lg:flex')}>
				<UserStar size={60} className={iconClass} />
				本月访问：{dasbardData?.monthVisitorsCount.reduce((acc: number, curr: { count: number }) => acc + curr.count, 0)}人
			</div>
			<div className={className}>
				<CircleUser size={60} className={iconClass} />
				今日访问：{dasbardData?.todayUsersCount}人
			</div>
			<div className={cn(className, 'hidden lg:flex')}>
				<BadgeJapaneseYen size={60} className={iconClass} />
				本周销售：{dasbardData?.weekSales}元
			</div>
			<div className={className}>
				<BriefcaseBusiness size={60} className={iconClass} />
				今日销售：{dasbardData?.todaySales}元
			</div>
		</div>
	)
}
