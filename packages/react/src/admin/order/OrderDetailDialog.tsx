import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import { useOrder } from '@/hooks/useOrder'
import { UserAvatar } from '@/user'
import type { Data } from '@app/admin/data'
import dayjs from 'dayjs'
import { ShoppingBag } from 'lucide-react'
import { memo, useMemo, type JSX, type FC, type MemoExoticComponent } from 'react'

type Props = {
	order: Data.Order
}

const OrderDetailDialogComponent = ({ order }: Props): JSX.Element => {
	const { getOrerType } = useOrder()
	const type = useMemo(() => getOrerType(order.orderableType), [getOrerType, order.orderableType])
	const Component = type?.detailComponent
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					<ShoppingBag size={16} />
					{type?.label}
				</Button>
			</DialogTrigger>
			<DialogContent className='min-w-xl'>
				<DialogHeader>
					<DialogTitle>{type?.label}</DialogTitle>
					<DialogDescription asChild>
						<div>
							<UserAvatar user={order.user} />
							<div>
								{order.user.nickname} 购买于 {dayjs(order.updatedAt).format('YYYY-MM-DD HH:mm:ss')}
							</div>
						</div>
					</DialogDescription>
				</DialogHeader>
				{Component ? <Component order={order} type={type} /> : null}
			</DialogContent>
		</Dialog>
	)
}

export const OrderDetailDialog: MemoExoticComponent<FC<Props>> = memo(OrderDetailDialogComponent)
