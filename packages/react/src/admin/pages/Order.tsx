import { Loading } from '@/common'
import { Page } from '@/common/Page'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { useApi } from '@/hooks'
import { useCommon } from '@/hooks/useCommon'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { type JSX } from 'react'

export const Order = (): JSX.Element => {
	const { api } = useApi()
	const { getCurrentPage } = useCommon()
	const { isLoading, data } = useQuery(api.orders.index.queryOptions({
		query: { page: getCurrentPage() }
	}))

	if (isLoading) return <Loading />
	if (!data?.data) return <></>
	const orders = data.data
	return (
		<Card>
			<CardHeader>
				<CardTitle>订单管理</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				<Table className='border'>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>用户</TableHead>
							<TableHead>订单号</TableHead>
							<TableHead>支付号</TableHead>
							<TableHead>金额</TableHead>
							<TableHead>状态</TableHead>
							<TableHead>支付渠道</TableHead>
							<TableHead>支付时间</TableHead>
							<TableHead>创建时间</TableHead>
							<TableHead className="text-right"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map(order => (
							<TableRow key={(order as any).id}>
								<TableCell className="font-medium">{order.id}</TableCell>
								<TableCell>
									<Avatar>
										<AvatarImage src={order.user.avatar || ''} />
										<AvatarFallback>{order.user.nickname}</AvatarFallback>
									</Avatar>
								</TableCell>
								<TableCell>{order.sn}</TableCell>
								<TableCell>{order.tradeNo}</TableCell>

								<TableCell>{order.price}</TableCell>
								<TableCell>{order.payState}</TableCell>
								<TableCell>{order.payType}</TableCell>
								<TableCell>{dayjs(order.updatedAt).format('YYYY-MM-DD')}</TableCell>
								<TableCell>{dayjs(order.createdAt).format('YYYY-MM-DD')}</TableCell>
								<TableCell className="text-right pr-5">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="size-8">
												<Button variant={'outline'} size={'sm'}>操作</Button>
												<span className="sr-only">Open menu</span>
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>查看</DropdownMenuItem>
											<DropdownMenuItem>标记已支付</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem variant="destructive">
												删除
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
			<CardFooter>
				<Page meta={data.metadata as any} />
			</CardFooter>
		</Card>
	)
}
