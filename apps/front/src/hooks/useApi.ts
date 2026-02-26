import { fieldErrorStore } from "@/store/fieldErrorStore";
import { createClient } from "@houdunyun/network";
export function useApi() {
	const client = createClient({
		baseURL: import.meta.env.VITE_BASE_URL,
		getToken: () => localStorage.getItem("token") || "",
		onRequest() {
			fieldErrorStore.setState(() => ({ errors: {} }))
		},
		onResponseError(ctx) {
			if (ctx.response?.status == 422) {
				const responseErrors = ctx.response._data.errors as Array<{ message: string, field: string }>
				responseErrors.forEach(item => {
					fieldErrorStore.setState(state => {
						console.log('	', '-----------------------')
						console.log('state', state)
						return {
							errors: {
								...state.errors,
								[item.field]: item.message,
							}
						}
					})
				})
			}
		},
	})
	return client
}