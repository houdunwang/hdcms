import { Alert } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useApi } from '@core/hooks/useApi'
import { useMutation, type UseMutationResult } from '@tanstack/react-query'
import { CheckCircle2Icon, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'

type Props = {
	// 微信二维码场景值
	scene_str: string,
	// 二维码获取成功后，父组件成功回调
	onSuccess: (ticket: string) => Promise<'success' | 'exist' | undefined>
	// 尝试次数
	requestCount?: number
	// 尝试间隔
	timeout?: number
	className?: string
}
export const WechatQrCode = ({ onSuccess, scene_str, className, requestCount = 30, timeout = 2000 }: Props) => {
	const { api } = useApi()
	type CreateQRCodeResponse = Parameters<NonNullable<ReturnType<typeof api.wechatQrs.create.mutationOptions>['onSuccess']>>[0]
	const [tryCount, setTryCount] = useState(requestCount)
	const [data, setData] = useState<CreateQRCodeResponse>()
	const wechatQrMutation = useMutation(api.wechatQrs.create.mutationOptions({
		onSuccess: (data) => {
			setTryCount(requestCount)
			setData(data)
		}
	}))

	useEffect(() => {
		wechatQrMutation.mutate({ body: { scene_str } })
	}, [])

	useEffect(() => {
		if (!data?.ticket) return
		const intervalId = setInterval(() => {
			setTryCount((prev) => {
				const next = prev - 1
				if (next <= 0) {
					clearInterval(intervalId)
				}
				return next
			})
			onSuccess(data.ticket).then((status) => {
				if (status === 'success') {
					clearInterval(intervalId)
				}
				if (status === 'exist') {
					wechatQrMutation.mutate({ body: { scene_str } })
				}
			})
		}, timeout)
		return () => {
			clearInterval(intervalId)
		}
	}, [data?.ticket])

	return (
		<div className={cn("flex flex-col items-center gap-3", className)}>
			<div className="rounded-lg bg-background p-3 border">
				{tryCount > 0 ? <QrImage qrImg={data?.qrImg} scene_str={scene_str} wechatQrMutation={wechatQrMutation} />
					:
					<div className="w-60 h-60 flex flex-col items-center justify-center gap-3">
						<RefreshCw size={30} />
						<RefreshButton scene_str={scene_str} wechatQrMutation={wechatQrMutation} />
						<div className='text-xs text-muted-foreground border py-1 px-3 rounded-sm'>
							二维码已过期，请点击刷新按钮获取
						</div>
						{/* <Button type="button" variant="secondary" size="lg" onClick={() => void wechatQrMutation.mutate({ body: { scene_str } })} disabled={wechatQrMutation.isPending}>
							刷新二维码
						</Button> */}
					</div>

				}
			</div>
		</div>
	)
}

function RefreshButton({ wechatQrMutation, scene_str }: { scene_str: string, wechatQrMutation: UseMutationResult<any, any, {}, undefined> }) {
	return <div className='flex flex-col items-center justify-center'>
		<Button type="button" variant="outline" size="default" onClick={() => void wechatQrMutation.mutate({ body: { scene_str } })} disabled={wechatQrMutation.isPending}>
			刷新二维码
		</Button>
	</div>
}

function QrImage({ qrImg, wechatQrMutation, scene_str }: { qrImg?: string, scene_str: string, wechatQrMutation: UseMutationResult<any, any, {}, undefined> }) {
	if (qrImg) return <div className='flex flex-col items-center justify-center cursor-pointer' onClick={() => void wechatQrMutation.mutate({ body: { scene_str } })}>
		<Tooltip>
			<TooltipTrigger>
				<img src={qrImg} alt="微信扫码登录二维码" className="w-60 h-60 object-contain" />
			</TooltipTrigger>
			<TooltipContent>
				<p>点击刷新二维码</p>
			</TooltipContent>
		</Tooltip>

	</div>
	return <div className="w-56 h-56 flex items-center justify-center text-muted-foreground">
		{/* <ScaleLoader color='#333' /> */}
		<Spinner className='size-10' />
	</div>
}

{/* {data?.qrImg ? (
						<img src={data.qrImg} alt="微信扫码登录二维码" className="w-60 h-60 object-contain" />
					) : (
						<div className="w-56 h-56 flex items-center justify-center text-muted-foreground">
							<ScaleLoader />
						</div>
					)} */}
{/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="size-4" />
				扫码失败时请点击刷新二维码
				</div> */}