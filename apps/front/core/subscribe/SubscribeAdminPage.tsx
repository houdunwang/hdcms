import { Loading, } from '#core/common'
import { ChartBar } from '#core/common/ChartBar'
import { Page } from '#core/common/Page'
import { SearchBlock } from '#core/common/SearchBlock'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useApi } from '#core/hooks'
import { dasbardStore } from '#core/store/dasbardStore'
import { UserAvatar } from '#core/user'
import { useQuery } from '@tanstack/react-query'
import { useRouterState } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { Handbag } from 'lucide-react'
import { type JSX } from 'react'

export const SubscribeAdminPage = (): JSX.Element => {
	const api = useApi()
	const location = useRouterState({ select: s => s.location })
	const dasbardData = useAtomValue(dasbardStore)
	const { isLoading, data } = useQuery(api.subscribe.index.queryOptions({
		query: location.search
	}))

	if (isLoading) return <Loading />
	if (!data?.data) return <></>
	return (
		<>
			<div className="grid lg:grid-cols-[1fr_auto_2fr] gap-3 pb-3">
				<SearchBlock
					options={[
						{ label: '用户ID', value: 'userId' },
					]}
				/>
				<div className={'flex flex-col justify-center items-center gap-3 border rounded-lg border-box p-3 text-sm'}>
					<Handbag className={'size-6'} />
					有效订阅：{dasbardData?.validSubscribers}人
				</div>
				<ChartBar
					data={dasbardData?.subscribersByMonth}
					className='lg:h-full h-32 border rounded-lg'
					chartConfig={{
						count: {
							label: "订阅量",
							color: "#2563eb",
						},
					}}
				/>

			</div>
			<Card>
				<CardHeader>
					<CardTitle>网站订阅</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className='w-10'>ID</TableHead>
								<TableHead className='w-20'>用户</TableHead>
								<TableHead>到期时间</TableHead>
								<TableHead>更新时间</TableHead>
								<TableHead className='text-right'>创建时间</TableHead>
								{/* <TableHead className="text-right"></TableHead> */}
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.data.map((order) => (
								<TableRow key={order.id}>
									<TableCell className="font-medium">{order.id}</TableCell>
									<TableCell> <UserAvatar user={order.user} /> </TableCell>
									<TableCell>{dayjs(order.endTime).format('YYYY-MM-DD')}</TableCell>
									<TableCell>{dayjs(order.createdAt).format('YYYY-MM-DD')}</TableCell>
									<TableCell className='text-right'>{dayjs(order.updatedAt).format('YYYY-MM-DD')}</TableCell>
									{/* <TableCell className="text-right pr-5">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button variant="ghost" size="icon" className="size-8">
													<TextAlignJustify />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem>标记已取消</DropdownMenuItem>
												<DropdownMenuSeparator />
												<DropdownMenuItem variant="destructive">
													删除
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell> */}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<Page meta={data.metadata as any} />
				</CardFooter>
			</Card>
		</>
	)
}
