import { Loading } from '@/common'
import { Page } from '@/common/Page'
import { SearchBlock } from '@/common/SearchBlock'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { ResultEmpty } from '@/error/ResultEmpty'
import { useApi } from '@/hooks'
import { cn } from '@/lib/utils'
import { dasbardStore } from '@/store/dasbardStore'
import { UserAvatar } from '@/user'
import { registry } from '@app/admin/registry'
import { useQuery } from '@tanstack/react-query'
import { useRouterState } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { CircleUser, SquareUser, TextAlignJustify, UserStar } from 'lucide-react'
import { type JSX } from 'react'

export function User(): JSX.Element {
	const { api } = useApi()
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
		'aspect-video rounded-xl bg-muted/50 flex flex-col justify-center items-center gap-3 text-sm lg:text-base border'
	const iconClass = 'text-muted-foreground size-10 lg:size-8'
	return (
		<>
			<div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-3 pb-3">
				<SearchBlock
					options={[
						{ label: '手机号', value: 'mobile' },
						{ label: '帐号', value: 'name' },
						{ label: '邮箱', value: 'email' },
					]}
				/>
				<div className="xl:flex gap-3 justify-start hidden">
					<div className={className}>
						<SquareUser className={iconClass} />
						总用户：{dasbardData?.totalUsersCount}人
					</div>
					<div className={cn(className)}>
						<UserStar size={60} className={iconClass} />
						本月访问：{dasbardData?.monthVisitorsCount.reduce((acc, curr) => acc + curr.count, 0)}人
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
			<CardContent className=" ">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">ID</TableHead>
							<TableHead className="w-16">头像</TableHead>
							<TableHead className="">帐号</TableHead>
							<TableHead>昵称</TableHead>
							<TableHead>邮箱</TableHead>
							<TableHead>注册时间</TableHead>
							<TableHead>最后登录</TableHead>
							<TableHead></TableHead>
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
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="size-8">
												<TextAlignJustify />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>Edit</DropdownMenuItem>
											<DropdownMenuItem>Duplicate</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<Page meta={data?.metadata} />
		</Card>
	)
}