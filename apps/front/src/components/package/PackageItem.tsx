import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import type { Data } from '@app/admin/data';
import { Check, ShoppingBag } from 'lucide-react';
import { WePay } from '@houdunyun/react/pay'

interface Props {
	item: Data.Package
}
export const PackageItem = ({ item }: Props) => {
	const payHandle = () => {

	}
	return (
		<Card className='min-w-92 py-12 rounded-none relative'>
			<CardHeader className='bg-white'>
				<CardTitle className='flex flex-col justify-center '>
					<div className="mt-3 w-full truncate text-destructive">
						123{item.title}
					</div>
					<div className="text-3xl font-bold text-primary mt-3">{item.price}</div>
					<div className="text-sm opacity-50 line-through">{item.originalPrice}</div>
				</CardTitle>
				<CardDescription className='truncate opacity-100 mt-1'>
					{item.ad}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col justify-start flex-1 border-t pt-6'>
				<div className='space-y-2'>
					{item.feature.map((feature: string) => (
						<div key={feature} className="text-sm opacity-50 flex items-center gap-1">
							<Check size={16} />
							<div className="truncate w-32">{feature}</div>
						</div>
					))}
				</div>
			</CardContent>
			<CardFooter className='flex justify-center flex-0 border-none bg-transparent'>
				<WePay
					subject={item.title}
					orderable_type="package"
					orderable_id={item.id}
					onSuccess={payHandle}
					payButton={<Button variant={'secondary'} color='primary' size={'lg'} className='w-full rounded-none py-6 text-base'>
						<ShoppingBag /> 微信支付
					</Button>}
				>
					<div className='mb-3'>
						{item.title}
					</div>
				</WePay>
			</CardFooter>
		</Card>
	)
}
