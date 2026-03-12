import { BadgeJapaneseYen, BriefcaseBusiness, CircleUser, SquareUser, UserStar } from 'lucide-react'
import { type JSX } from 'react'
import { registry } from '@app/admin/registry'
import { cn } from '@/lib/utils'

type Props = {
	data: typeof registry.$tree.admin.types.response.data
}
export const Total = ({ data }: Props): JSX.Element => {
	const className = 'aspect-video rounded-xl bg-muted/50 flex flex-col justify-center items-center gap-3 text-sm lg:text-base'
	const iconClass = 'text-muted-foreground size-10 lg:size-12'
	return (
		<div className="grid auto-rows-min gap-1 lg:gap-4 grid-cols-3 lg:grid-cols-5">
			<div className={className}>
				<SquareUser className={iconClass} />
				总用户：{data?.totalUsersCount}人
			</div>
			<div className={cn(className, 'hidden lg:flex')}>
				<UserStar size={60} className={iconClass} />
				本月访问：{data.monthVisitorsCount.reduce((acc, curr) => acc + curr.count, 0)}人
			</div>
			<div className={className}>
				<CircleUser size={60} className={iconClass} />
				今日访问：{data?.todayUsersCount}人
			</div>
			<div className={cn(className, 'hidden lg:flex')}>
				<BadgeJapaneseYen size={60} className={iconClass} />
				本周销售：{data?.weekSales}元
			</div>
			<div className={className}>
				<BriefcaseBusiness size={60} className={iconClass} />
				今日销售：{data?.todaySales}元
			</div>
		</div>
	)
}
