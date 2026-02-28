import { registry } from '@app/admin/registry'
import { AuthEnum } from '@core/enum'
import { fieldErrorAtom } from '@core/store/fieldErrorStore'
import { createTuyau } from '@tuyau/core/client'
import { useSetAtom } from 'jotai'
import { toast } from "sonner"


export function useRequestClient() {
	const setFieldError = useSetAtom(fieldErrorAtom)
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
					switch (error.response.status) {
						case 401:
							localStorage.removeItem(AuthEnum.TOKEN_NAME)
							window.location.href = '/login'
							break
						case 429:
							const msg = await error.response.json() as { errors: { message: string }[] }
							toast.info(msg.errors[0].message as string)
							break
						case 422:
							const response = await error.response.json() as { errors: { message: string, field: string }[] }
							const errorsFields = {} as Record<string, string>
							response.errors.forEach(item => {
								errorsFields[item.field] = item.message
							})
							setFieldError(errorsFields)
							break;
						default:
							console.error('Error:', error.message)
							break
					}
					return error
				}
			]
		}
	})
}
