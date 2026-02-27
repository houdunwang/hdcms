import { registry } from '@app/admin/registry'
import { ThemeProvider } from '@core/components/theme/theme-provider'
import { fieldErrorStore } from '@core/store/fieldErrorStore'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createTuyau } from '@tuyau/core/client'
import { createTuyauReactQueryClient } from '@tuyau/react-query'
import type { ReactNode } from 'react'
import { toast, Toaster } from "sonner"
export const useApi = () => {
	const tuyauClient = getCreateTuyauClient()
	const TanstackQueryClientProvider = ({ children }: { children: ReactNode }) => {
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: 0
				}
			}

		})
		return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<QueryClientProvider client={queryClient}> {children} </QueryClientProvider>
			<Toaster position='top-center' />
		</ThemeProvider>
	}

	const api = createTuyauReactQueryClient({ client: tuyauClient })
	return { api, TanstackQueryClientProvider }
}

function getCreateTuyauClient() {
	return createTuyau({
		baseUrl: import.meta.env.VITE_API_URL,
		registry,
		headers: { Accept: 'application/json' },
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
							response.errors.forEach(item => {
								fieldErrorStore.setState(state => {
									return {
										errors: {
											...state.errors,
											[item.field]: item.message,
										}
									}
								})
							})
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
