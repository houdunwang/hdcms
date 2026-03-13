import { Loading } from '@/common'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { useApi } from '@/hooks'
import type { orderType } from '@/hooks/useOrder'
import type { Data } from '@app/admin/data'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import type { FC, JSX } from 'react'

type Props = {
	order: Data.Order
	type: orderType | undefined
}
export const SubscribeDetail: FC<Props> = ({ order, type }): JSX.Element => {
	const { api } = useApi();
	const { isLoading, data: subscribe } = useQuery(api.subscribe.show.queryOptions({
		params: { id: order.orderableId }
	}))
	if (isLoading) return <Loading />
	return (
		<>
			<Field>
				<FieldLabel htmlFor="username">用户会员订阅到期时间</FieldLabel>
				<Input type="text" defaultValue={dayjs(subscribe?.data.endTime).format('YYYY-MM-DD HH:mm:ss') || ''} />
			</Field>
			<Field>
				<FieldLabel htmlFor="username">商品名称</FieldLabel>
				<Input type="text" defaultValue={order.subject} />
			</Field>
			<Field>
				<FieldLabel htmlFor="username">支付号</FieldLabel>
				<Input type="text" defaultValue={order.tradeNo || ''} />
			</Field>
			<Field>
				<FieldLabel htmlFor="username">价格</FieldLabel>
				<Input type="text" defaultValue={order.price} />
			</Field>
			<Field>
				<FieldLabel htmlFor="username">支付时间</FieldLabel>
				<Input type="text" defaultValue={dayjs(order.updatedAt).format('YYYY-MM-DD HH:mm:ss')} />
			</Field>
		</>
	)
}
