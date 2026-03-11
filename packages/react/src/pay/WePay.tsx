import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { useApi } from '@/hooks'
import { useMutation } from '@tanstack/react-query'
import { CircleX, Clock } from 'lucide-react'
import { useCallback, useEffect, useState, type ReactNode } from 'react'

interface Props {
	subject: string
	orderable_type: any
	orderable_id: number
	children?: ReactNode
	payButton?: ReactNode
	qrRefreshTime?: number
	onSuccess: () => void
}
export const WePay = ({ payButton, ...props }: Props): React.JSX.Element => {
	const [open, setOpen] = useState(false)
	const openHandle = (open: boolean) => {
		setOpen(open)
	}
	return (
		<AlertDialog open={open} onOpenChange={openHandle}>
			<AlertDialogTrigger asChild>{payButton || <Button> 微信支付 </Button>}</AlertDialogTrigger>
			<AlertDialogContent className="flex flex-col justify-center items-center ">

				<AlertDialogHeader>
					<AlertDialogTitle className="text-center"></AlertDialogTitle>
					<AlertDialogDescription></AlertDialogDescription>
					<PayQr {...props} setOpen={setOpen} />
				</AlertDialogHeader>
				{/* <AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction>Continue</AlertDialogAction>
				</AlertDialogFooter> */}
			</AlertDialogContent>
		</AlertDialog>
	)
}

function PayQr({
	children,
	setOpen,
	qrRefreshTime = 120,
	...props
}: { setOpen: (open: boolean) => void } & Props) {
	const { api } = useApi()
	const qrMutation = useMutation(api.pays.wepay.mutationOptions({
		onError: () => {
			setOpen(false)
		},
	}))
	const [checkNum, setCheckNum] = useState(qrRefreshTime)
	const checkMutation = useMutation(api.pays.wepayCheck.mutationOptions({

	}))
	const getQr = useCallback(async () => {
		return qrMutation.mutateAsync({
			body: {
				subject: props.subject,
				orderable_type: props.orderable_type,
				orderable_id: props.orderable_id,
			},
		})
	}, [])

	const checkPay = useCallback(async () => {
		if (!qrMutation.data?.data.sn) return
		try {
			const res = await checkMutation.mutateAsync({
				body: { sn: qrMutation.data?.data.sn },
			})
			if (res?.data.success) {
				props.onSuccess()
				setOpen(false)
			}
		} catch (error) {
			setOpen(false)
		}
	}, [qrMutation.data?.data.sn, props.onSuccess])

	useEffect(() => {
		getQr()
	}, [])

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
	if (qrMutation.isPending || !qrMutation.data)
		return (
			<div className="flex items-center justify-center py-12">
				<Spinner className="size-12" />
			</div>
		)

	return (
		<div className="flex flex-col justify-center items-center ">
			<div>{children}</div>
			<div className='absolute right-2 top-2 cursor-pointer' onClick={() => setOpen(false)}>
				<CircleX size={20} />
			</div>
			<div>请扫描下方二维码完成支付</div>
			<div>
				<img src={qrMutation.data?.data?.qrImg || ''} />
			</div>
			<div className="text-muted-foreground text-sm flex items-center justify-center gap-1">
				<Clock size={15} /> {checkNum} 秒后自动刷新
			</div>
		</div>
	)
}
