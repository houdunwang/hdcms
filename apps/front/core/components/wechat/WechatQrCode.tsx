import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useApi } from '@core/hooks/useApi'
import { useAuth } from '@core/hooks/useAuth'
import { useMutation } from '@tanstack/react-query'
import { Clock, RefreshCw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { ScaleLoader } from 'react-spinners'

type Props = {
	onSuccess: (ticket: string) => Promise<boolean>
}
export const WechatQrCode = ({ onSuccess }: Props) => {
	const { api } = useApi()

	type CreateQRCodeResponse = Parameters<NonNullable<ReturnType<typeof api.wechatQrs.create.mutationOptions>['onSuccess']>>[0]

	const [data, setData] = useState<CreateQRCodeResponse>()
	const wechatQrMutation = useMutation(api.wechatQrs.create.mutationOptions({
		onSuccess: (data) => {
			setData(data)
		}
	}))

	useEffect(() => {
		wechatQrMutation.mutate({ body: { scene_str: 'login' } })
	}, [])

	useEffect(() => {
		const id = setInterval(() => {
			if (data?.ticket) {
				onSuccess(data.ticket).then((isSuccess) => {
					if (isSuccess) {
						clearInterval(id)
					}
				})
			}
		}, 3000)
		return () => {
			clearInterval(id)
		}
	}, [data?.ticket])
	return (
		<div className="flex flex-col items-center gap-3">
			<div className="rounded-lg bg-background p-3 border">
				{data?.qrImg ? (
					<img src={data.qrImg} alt="微信扫码登录二维码" className="w-60 h-60 object-contain" />
				) : (
					<div className="w-56 h-56 flex items-center justify-center text-muted-foreground">
						<ScaleLoader />
					</div>
				)}
			</div>
			<div className="flex items-center gap-2 text-sm text-muted-foreground">
				<Clock className="size-4" />
				扫码失败时请点击刷新二维码
			</div>
			<Button type="button" variant="outline" size="lg" onClick={() => void wechatQrMutation.mutate({ body: { scene_str: 'login' } })} disabled={wechatQrMutation.isPending}>
				<RefreshCw className="size-4 mr-2" />
				刷新二维码
			</Button>
		</div>
	)
}
