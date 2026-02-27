import { fieldErrorStore } from "core/store/fieldErrorStore";
import { createClient } from "@houdunyun/network";
export function useNetwork() {
	const api = createClient({
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
	return api
}