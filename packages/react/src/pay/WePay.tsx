import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/spinner';
import { useApi } from '@/hooks';
import { useMutation } from '@tanstack/react-query';
import { Clock } from 'lucide-react';
import { useCallback, useEffect, useState, type ReactNode } from 'react';


interface Props {
	subject: string,
	orderable_type: any
	orderable_id: number,
	children?: ReactNode
	payButton?: ReactNode
	qrRefreshTime?: number
	onSuccess: () => void
}
export const WePay = ({ payButton, ...props }: Props) => {
	const [open, setOpen] = useState(false)
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				{payButton || <Button> 微信支付 </Button>}
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>微信支付</DialogTitle>
					<DialogDescription asChild>
					</DialogDescription>
					<PayQr {...props} setOpen={setOpen} />
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

function PayQr({ children, setOpen, qrRefreshTime = 120, ...props }: { setOpen: (open: boolean) => void } & Props) {
	const { api } = useApi()
	const { isPending, mutateAsync, data } = useMutation(api.pays.wepay.mutationOptions())
	const [checkNum, setCheckNum] = useState(qrRefreshTime)
	const checkMutation = useMutation(api.pays.wepayCheck.mutationOptions())
	const getQr = useCallback(async () => {
		return mutateAsync({
			body: {
				subject: props.subject,
				orderable_type: props.orderable_type,
				orderable_id: props.orderable_id,
			}
		})
	}, [])

	const checkPay = useCallback(async () => {
		if (!data?.data.sn) return
		try {
			const res = await checkMutation.mutateAsync({
				body: { sn: data?.data.sn }
			})
			if (res?.data == 'success') {
				props.onSuccess()
				setOpen(false)
			}
		} catch (error) {
			setOpen(false)
		}
	}, [data?.data.sn, props.onSuccess])

	useEffect(() => { getQr() }, [])

	useEffect(() => {
		if (checkNum > 0) checkPay()
	}, [checkNum])

	useEffect(() => {
		if (checkNum <= 0) {
			setCheckNum(qrRefreshTime)
			getQr()
			return
		}
		const timer = setTimeout(() => setCheckNum(checkNum - 1), 1000)
		return () => clearTimeout(timer)
	}, [checkNum])
	if (isPending || !data) return <div className='flex items-center justify-center py-12'>
		<Spinner className='size-12' />
	</div>

	return <div className='flex flex-col justify-center items-center'>
		<div>{children}</div>
		<div>请扫描下方二维码完成支付</div>
		<div><img src={data?.data?.qrImg || ''} /></div>
		<div className='text-muted-foreground text-sm flex items-center justify-center gap-1'>
			<Clock size={15} /> {checkNum} 秒后自动刷新
		</div>
	</div>
}
