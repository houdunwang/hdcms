import { registry } from '@app/admin/registry'
import { ThemeProvider } from '@core/components/theme/theme-provider'
import { fieldErrorAtom } from '@core/store/fieldErrorStore'
import { createTuyau } from '@tuyau/core/client'
import { createTuyauReactQueryClient } from '@tuyau/react-query'
import { useSetAtom } from 'jotai'
import type { ReactNode } from 'react'
import { toast, Toaster } from "sonner"
export const useApi = () => {
	const tuyauClient = useTuyauClient()
	const TanstackQueryClientProvider = ({ children }: { children: ReactNode }) => {
		return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			{children}
			<Toaster position='top-center' />
		</ThemeProvider>
	}

	const api = createTuyauReactQueryClient({ client: tuyauClient })
	return { api, TanstackQueryClientProvider }
}

export function useTuyauClient() {
	const setFieldError = useSetAtom(fieldErrorAtom)
	return createTuyau({
		baseUrl: import.meta.env.VITE_API_URL,
		registry,
		headers: { Accept: 'application/json' },
		timeout: 600000,
		hooks: {
			beforeRequest: [
				(request) => {
					const token = localStorage.getItem('auth_token')
					if (token) {
						request.headers.set('Authorization', `Bearer ${token}`)
					}
				}
			],
			beforeError: [
				async (error) => {
					switch (error.response.status) {
						case 401:
							localStorage.removeItem('auth_token')
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
