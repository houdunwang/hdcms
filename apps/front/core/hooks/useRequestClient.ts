import { registry } from '@app/admin/registry';
import { AuthEnum } from '#core/types/enum';
import { fieldErrorAtom } from '#core/store/fieldErrorAtom.ts';
import { createTuyau } from '@tuyau/core/client';
import { useSetAtom } from 'jotai';
import { toast } from "sonner";
import type { Tuyau } from '@tuyau/core/client'
type Registry = typeof import('@app/admin/registry').registry
type RequestClient = Tuyau<Registry>

export function useRequestClient(): RequestClient {
	const setFieldError = useSetAtom(fieldErrorAtom)
	return createTuyau({
		baseUrl: 'http://localhost:3333',
		registry,
		headers: { Accept: 'application/json' },
		timeout: 10000,
		credentials: "include",
		hooks: {
			beforeRequest: [
				(_request) => {
					setFieldError({})
				}
			],
			afterResponse: [
				async (_request, _options, response) => {
					try {
						if (response.ok) {
							const res = await response.json() as { data: { message?: string } }
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

					const responseData = await error.response.clone().json() as { message?: string, errors: { field: string, message: string, retryAfter: number }[] }
					switch (error.response.status) {
						case 401:
							location.href = '/auth'
							break
						case 429:
							toast.info(responseData.errors[0].message as string)
							break
						case 403:
							toast.error('没有操作权限')
							break;
						case 422:
							const errorsFields = {} as Record<string, string>
							responseData.errors.forEach((item: { field: string, message: string }) => {
								errorsFields[item.field] = item.message
							})
							setFieldError(errorsFields)
							break;
						default:
							try {
								const message = responseData.message || responseData.errors[0].message || '请求失败'
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
