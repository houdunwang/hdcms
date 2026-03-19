import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { registry } from '@app/admin/registry'
import { useQuery } from '@tanstack/react-query'
import { useRouterState } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { CircleUser, SquareUser, UserStar } from 'lucide-react'
import { type JSX } from 'react'
import { Loading } from '#core/common'
import { ChartBar } from '#core/common/ChartBar'
import { Page } from '#core/common/Page'
import { SearchBlock } from '#core/common/SearchBlock'
import { ResultEmpty } from '#core/errors/ResultEmpty'
import { useApi } from '#core/hooks'
import { dasbardStore } from '#core/store/dasbardStore'
import { UserAvatar } from '#core/user'

export function UserAdminPage(): JSX.Element {
	const api = useApi()
	const location = useRouterState({ select: s => s.location })
	const dasbardData = useAtomValue(dasbardStore)
	const { isLoading, data } = useQuery(
		api.users.index.queryOptions({
			query: { ...location.search },
		})
	)
	if (isLoading) return <Loading />
	if (!data?.data) return <></>
	const className =
		'rounded-xl bg-muted/50 flex flex-col justify-center items-center gap-3 border text-sm'
	const iconClass = 'text-muted-foreground size-10 lg:size-6'
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] 2xl:grid-cols-[1fr_2fr_1fr] gap-3 pb-3">
				<SearchBlock
					options={[
						{ label: 'UID', value: 'id' },
						{ label: '手机号', value: 'mobile' },
						{ label: '帐号', value: 'name' },
						{ label: '邮箱', value: 'email' },
					]}
				/>
				<ChartBar
					data={dasbardData?.monthVisitorsCount}
					className='h-full border rounded-lg flex-1 hidden lg:flex'
					dateKey='day'
					chartConfig={{
						count: {
							label: "访问量",
							color: "#2563eb",
						}
					}}
				/>
				<div className="gap-3 hidden grid-cols-3 2xl:grid">
					<div className={className}>
						<SquareUser className={iconClass} />
						总用户：{dasbardData?.totalUsersCount}人
					</div>
					<div className={cn(className)}>
						<UserStar size={60} className={iconClass} />
						本月访问：{dasbardData?.monthVisitorsCount.reduce((acc: number, curr: { count: number }) => acc + curr.count, 0)}人
					</div>
					<div className={className}>
						<CircleUser size={60} className={iconClass} />
						今日访问：{dasbardData?.todayUsersCount}人
					</div>
				</div>
			</div>
			{data?.data.length ? <RenderUserTable data={data} /> : <ResultEmpty />}
		</>
	)
}

function RenderUserTable({ data }: { data: typeof registry.$tree.users.index.types.response }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>用户管理</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent className="max-w-full">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">ID</TableHead>
							<TableHead className="w-16">头像</TableHead>
							<TableHead className="">帐号</TableHead>
							<TableHead>昵称</TableHead>
							<TableHead>邮箱</TableHead>
							<TableHead>注册时间</TableHead>
							<TableHead className='w-12'>最后登录</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data?.data.map((user) => (
							<TableRow key={user.id}>
								<TableCell className="font-medium">{user.id}</TableCell>
								<TableCell>
									<UserAvatar user={user} />
								</TableCell>
								<TableCell>{user.name}</TableCell>
								<TableCell>{user.nickname}</TableCell>
								<TableCell>{user.email}</TableCell>
								<TableCell>{dayjs(user.createdAt).format('YYYY-MM-DD')}</TableCell>
								<TableCell>{dayjs(user.updatedAt).format('YYYY-MM-DD')}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<Page meta={data?.metadata} />
		</Card>
	)
}