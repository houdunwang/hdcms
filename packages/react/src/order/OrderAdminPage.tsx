import { Loading, } from '@/common'
import { ChartBar } from '@/common/ChartBar'
import { Page } from '@/common/Page'
import { SearchBlock } from '@/common/SearchBlock'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { ResultEmpty } from '@/error/ResultEmpty'
import { useApi } from '@/hooks'
import { dasbardStore } from '@/store/dasbardStore'
import { UserAvatar } from '@/user'
import type { Data } from '@app/admin/data'
import { registry } from '@app/admin/registry'
import { useQuery } from '@tanstack/react-query'
import { useMatch } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useAtomValue } from 'jotai'
import { ShoppingBag } from 'lucide-react'
import { memo, type FC, type JSX } from 'react'

export const OrderAdminPage = (): JSX.Element => {
	const { api } = useApi()
	const { search } = useMatch({ strict: false })
	const dasbardData = useAtomValue(dasbardStore)
	const { isLoading, data } = useQuery(api.orders.index.queryOptions({
		query: search
	}))
	if (isLoading) return <Loading />
	if (!data?.data) return <></>

	return (
		<>
			<div className="grid lg:grid-cols-[1fr_2fr_auto] gap-3 pb-3">
				<SearchBlock
					options={[
						{ label: '用户ID', value: 'userId' },
						{ label: '订单号', value: 'sn' },
						{ label: '支付订单号', value: 'tradeNo' },
						{ label: '订单类型', value: 'orderableType' },
					]}
				/>
				<ChartBar
					data={dasbardData?.orderMonths}
					className='h-full border rounded-lg'
					chartConfig={{
						amount: {
							label: "订单金额",
							color: "#2563eb",
						},
						count: {
							label: "订单量",
							color: "#7158e2",
						},
					}}
				/>
				<div className={'flex flex-col justify-center items-center gap-3 border rounded-lg px-3 text-sm'}>
					<ShoppingBag className={'size-6'} />
					总销售：{dasbardData?.orderMonths.reduce((acc, curr) => acc + curr.amount, 0)} 元
				</div>
			</div>

			{data?.data.length ? <RenderOrderTable data={data} /> : <ResultEmpty />}
		</>
	)
}

const RenderOrderTable = ({ data }: { data: typeof registry.$tree.orders.index.types.response }) => {
	return <Card>
		<CardHeader>
			<CardTitle>订单管理</CardTitle>
			<CardDescription></CardDescription>
		</CardHeader>
		<CardContent>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead>用户</TableHead>
						<TableHead>订单号</TableHead>
						<TableHead>订单类型</TableHead>
						<TableHead>金额</TableHead>
						<TableHead>状态</TableHead>
						<TableHead>支付渠道</TableHead>
						<TableHead>支付时间</TableHead>
						<TableHead>创建时间</TableHead>
						{/* <TableHead className="text-right"></TableHead> */}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.data.map(order => (
						<MemoOrderRow key={order.id} order={order} />
					))}
				</TableBody>
			</Table>
		</CardContent>
		<Page meta={data.metadata as any} />
	</Card>
}
type RowProps = {
	order: Data.Order
}

const OrderRow: FC<RowProps> = ({ order }) => {
	return (
		<TableRow>
			<TableCell className="font-medium">{order.id}</TableCell>
			<TableCell>
				<UserAvatar user={order.user} />
			</TableCell>
			<TableCell>{order.sn}</TableCell>
			<TableCell>
			</TableCell>
			<TableCell>{order.price}</TableCell>
			<TableCell>{order.payState}</TableCell>
			<TableCell>{order.payType}</TableCell>
			<TableCell>{dayjs(order.updatedAt).format('YYYY-MM-DD')}</TableCell>
			<TableCell>{dayjs(order.createdAt).format('YYYY-MM-DD')}</TableCell>
		</TableRow>
	)
}

const MemoOrderRow = memo(OrderRow)
