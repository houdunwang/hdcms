import { Loading, } from '@/common'
import { Page } from '@/common/Page'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { useApi } from '@/hooks'
import { UserAvatar } from '@/user'
import { useQuery } from '@tanstack/react-query'
import { useRouterState } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { TextAlignJustify } from 'lucide-react'
import { type JSX } from 'react'

export const Subscribe = (): JSX.Element => {
	const { api } = useApi()
	const location = useRouterState({ select: s => s.location })

	const { isLoading, data } = useQuery(api.orders.index.queryOptions({
		query: location.search
	}))

	if (isLoading) return <Loading />
	if (!data?.data) return <></>
	const orders = data.data
	return (
		<Card>
			<CardHeader>
				<CardTitle>订阅管理</CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>ID</TableHead>
							<TableHead>用户</TableHead>
							<TableHead>订单号</TableHead>
							<TableHead>金额</TableHead>
							<TableHead>状态</TableHead>
							<TableHead>更新时间</TableHead>
							<TableHead>创建时间</TableHead>
							<TableHead className="text-right"></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order: any) => (
							<TableRow key={order.id}>
								<TableCell className="font-medium">{order.id}</TableCell>
								<TableCell>
									<UserAvatar user={order.user} />
								</TableCell>
								<TableCell>{order.sn}</TableCell>
								<TableCell>{order.price}</TableCell>
								<TableCell>{order.payState}</TableCell>
								<TableCell>{dayjs(order.updatedAt).format('YYYY-MM-DD')}</TableCell>
								<TableCell>{dayjs(order.createdAt).format('YYYY-MM-DD')}</TableCell>
								<TableCell className="text-right pr-5">
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="icon" className="size-8">
												<TextAlignJustify />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>查看</DropdownMenuItem>
											<DropdownMenuItem>标记已取消</DropdownMenuItem>
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
