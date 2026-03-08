import { registry } from '@app/admin/registry';
import { AuthEnum } from '@core/enum';
import { fieldErrorAtom } from '@core/store/fieldErrorStore';
import { createTuyau } from '@tuyau/core/client';
import { useSetAtom } from 'jotai';
import { toast } from "sonner";


export function useRequestClient() {
	const setFieldError = useSetAtom(fieldErrorAtom)

	return createTuyau({
		baseUrl: import.meta.env.VITE_API_URL,
		registry,
		headers: { Accept: 'application/json' },
		timeout: 10000,
		hooks: {
			beforeRequest: [
				(request) => {
					const token = localStorage.getItem(AuthEnum.TOKEN_NAME)
					if (token) {
						request.headers.set('Authorization', `Bearer ${token}`)
					}
					setFieldError({})
				}
			],
			afterResponse: [
				async (_request, _options, response) => {
					try {
						if (response.ok) {
							const res = await response.json() as { data: { message?: string } }
							console.log('	response', response)
							console.log('	res', res)
							if (res.data.message) {
								toast.success(res.data.message)
							}
						}
					} catch (error) {
					}
				}
			],
			beforeError: [
				async (error) => {
					if (!error.response) {
						toast.error('网络连接失败')
						return error
					}

					const responseData = await error.response.clone().json() as { message: string }
					console.log('responseData', responseData)
					switch (error.response.status) {
						case 401:
							localStorage.removeItem(AuthEnum.TOKEN_NAME)
							location.href = '/auth'
							break
						case 429:
							const msg = responseData as unknown as { errors: { message: string, retryAfter: number }[] }
							toast.info(msg.errors[0].message as string)
							break
						case 422:
							const validationError = responseData as unknown as { errors: { message: string, field: string }[] }
							const errorsFields = {} as Record<string, string>
							validationError.errors.forEach((item: { field: string, message: string }) => {
								errorsFields[item.field] = item.message
							})
							setFieldError(errorsFields)
							break;
						default:
							try {
								const message = responseData.message || '请求失败'
								toast.error(message)
							} catch (error) {
								toast.error('请求失败')
							}
							break
					}
					return error
				}
			]
		}
	})
}
