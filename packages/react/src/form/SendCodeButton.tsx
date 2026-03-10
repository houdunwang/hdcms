import { Button } from "@/components/ui/button"
import { useApi } from "@/hooks/useApi"
import { useMutation } from "@tanstack/react-query"
import type { TuyauHTTPError } from "@tuyau/core/client"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import z from "zod"
import { registry } from '@app/admin/registry';

interface Props {
	type: 'email' | 'mobile'
	value: string
}
export const SendCodeButton = ({ type, value }: Props) => {
	const validates = {
		email: z.string().min(1, '请输入正确的邮箱'),
		mobile: z.string().regex(/^1[3-9]\d{9}$/, '请输入正确的手机号')
	}
	const second = dayjs(localStorage.getItem('remainingSeconds')).diff(dayjs(), 'second');
	const [countdown, setCountdown] = useState(second)
	const { api } = useApi()
	const mutationOptions = {
		onSuccess: ({ data }: typeof registry.$tree.codes.email.types.response) => {
			localStorage.setItem('remainingSeconds', dayjs().add(data.remainingSeconds, 'second').toString())
			setCountdown(60)
		},
		onError: (error: TuyauHTTPError) => {
			if (error.status === 400) {
				const response = error.response as { message: string, remainingSeconds?: number }
				localStorage.setItem('remainingSeconds', dayjs().add(response.remainingSeconds || 0, 'second').toString())
				if (response?.remainingSeconds) {
					setCountdown(response.remainingSeconds)
				}
			}
		}
	}
	const mutationEmail = useMutation(api.codes.email.mutationOptions(mutationOptions))
	const mutationMobile = useMutation(api.codes.mobile.mutationOptions(mutationOptions))

	useEffect(() => {
		if (countdown <= 0) return
		const timer = setTimeout(() => setCountdown(c => c - 1), 1000)
		return () => clearTimeout(timer)
	}, [countdown])

	const send = async () => {
		if (!value) {
			toast.error(type === 'email' ? '请输入正确的邮箱' : '请输入正确的手机号')
			return
		}
		if (countdown > 0 || (type === 'email' ? mutationEmail.isPending : mutationMobile.isPending)) return
		const result = validates[type].safeParse(value)
		if (!result.success) {
			toast.error(result.error.issues[0].message)
			return
		}
		if (type === 'email') {
			await mutationEmail.mutateAsync({
				body: {
					email: value
				}
			})
		} else {
			await mutationMobile.mutateAsync({
				body: {
					mobile: value
				}
			})
		}

	}
	return <Button
		variant={'outline'}
		type="button"
		disabled={countdown > 0 || (type === 'email' ? mutationEmail.isPending : mutationMobile.isPending)}
		onClick={send}>
		{countdown > 0 ? `${countdown}秒后再试` : '发送验证码'}
	</Button>
}