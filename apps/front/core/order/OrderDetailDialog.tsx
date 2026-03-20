import { Field, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { orderTypes } from '#config/order.tsx'
import { UserAvatar } from '#core/user'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import type { Data } from '@app/admin/data'
import dayjs from 'dayjs'
import { ShoppingBag } from 'lucide-react'
type Props = {
	order: Data.Order
}

export const OrderDetailDialog = ({ order }: Props) => {
	const orderType = orderTypes[order.orderableType as keyof typeof orderTypes]
	console.log('orderType.detailComponent', orderType?.detailComponent)
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<ShoppingBag size={16} />
					{orderType?.label || '订单详情'}
				</Button>
			</DialogTrigger>
			<DialogContent className='min-w-xl'>
				<DialogHeader>
					<DialogTitle>{orderType?.label}</DialogTitle>
					<DialogDescription asChild>
						<div>
							<UserAvatar user={order.user} />
							<div>
								<div>
									{order.user.nickname}
								</div>
								<div>
									购买于 {dayjs(order.updatedAt).format('YYYY-MM-DD HH:mm')}
								</div>
								<div>电话: {order.user.mobile}</div>
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
				{orderType?.detailComponent ? <orderType.detailComponent order={order} /> : null}
				<Card>
					<CardHeader>
						<CardTitle>支付信息</CardTitle>
						<CardDescription></CardDescription>
					</CardHeader>
					<CardContent className='space-y-3'>
						<Field>
							<FieldLabel htmlFor="username">商品名称</FieldLabel>
							<Input type="text" defaultValue={order.subject} />
						</Field>
						<Field>
							<FieldLabel htmlFor="username">支付号</FieldLabel>
							<Input type="text" defaultValue={order.tradeNo || ''} />
						</Field>
						<Field>
							<FieldLabel htmlFor="username">金额</FieldLabel>
							<Input type="text" defaultValue={order.price} />
						</Field>
						<Field>
							<FieldLabel htmlFor="username">支付时间</FieldLabel>
							<Input type="text" defaultValue={dayjs(order.updatedAt).format('YYYY-MM-DD HH:mm:ss')} />
						</Field>
					</CardContent>
				</Card>
			</DialogContent>
		</Dialog>
	)
}

