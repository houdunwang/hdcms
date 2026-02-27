import { QueryClient } from '@tanstack/react-query'
import { createTuyau } from '@tuyau/core/client'
import { createTuyauReactQueryClient } from '@tuyau/react-query'
import { registry } from '@app/admin/registry'
import { toast } from "sonner"
const client = createTuyau({
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
					default:
						console.error('Error:', error.message)
						break
				}
				return error
			}
		]
	}
})

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 0
		}
	}
})
export const api = createTuyauReactQueryClient({ client })
