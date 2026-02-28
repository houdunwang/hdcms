import { registry } from '@app/admin/registry'
import { AuthEnum } from '@core/enum'
import { fieldErrorAtom } from '@core/store/fieldErrorStore'
import { useNavigate } from '@tanstack/react-router'
import { createTuyau } from '@tuyau/core/client'
import { useSetAtom } from 'jotai'
import { toast } from "sonner"


export function useRequestClient() {
	const setFieldError = useSetAtom(fieldErrorAtom)
	const navigate = useNavigate()
	return createTuyau({
		baseUrl: import.meta.env.VITE_API_URL,
		registry,
		headers: { Accept: 'application/json' },
		timeout: 600000,
		hooks: {
			beforeRequest: [
				(request) => {
					const token = localStorage.getItem(AuthEnum.TOKEN_NAME)
					if (token) {
						request.headers.set('Authorization', `Bearer ${token}`)
					}
				}
			],
			beforeError: [
				async (error) => {
					if (!error.response) {
						toast.error('网络连接失败')
						return error
					}

					let responseData
					try {
						responseData = await error.response.clone().json()
					} catch (e) {
					}

					if (responseData) {
						Object.assign(error, responseData)
					}

					switch (error.response.status) {
						case 401:
							localStorage.removeItem(AuthEnum.TOKEN_NAME)
							navigate({ to: '/login' })
							break
						case 429:
							const msg = responseData as { errors: { message: string }[] } | { message: string } | undefined
							if (msg) {
								if ('errors' in msg) {
									toast.info(msg.errors[0].message as string)
								} else if ('message' in msg) {
									toast.info(msg.message)
								}
							}
							break
						case 422:
							const validationError = responseData as { errors: { message: string, field: string }[] } | undefined
							if (validationError && validationError.errors) {
								const errorsFields = {} as Record<string, string>
								validationError.errors.forEach((item: { field: string, message: string }) => {
									errorsFields[item.field] = item.message
								})
								setFieldError(errorsFields)
							}
							break;
						case 400:
							break
						default:
							try {
								const res = responseData as { message: string } | undefined
								if (res && res.message) {
									toast.error(res.message)
								} else {
									toast.error('请求失败')
								}
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
