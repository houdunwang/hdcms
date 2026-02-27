import { fieldErrorAtom } from "core/store/fieldErrorStore";
import { createClient } from "@houdunyun/network";
import { useSetAtom } from "jotai";
export function useNetwork() {
	const setFieldError = useSetAtom(fieldErrorAtom)
	const api = createClient({
		baseURL: import.meta.env.VITE_BASE_URL,
		getToken: () => localStorage.getItem("token") || "",
		onRequest() {
			setFieldError({})
		},
		onResponseError(ctx) {
			if (ctx.response?.status == 422) {
				const responseErrors = ctx.response._data.errors as Array<{ message: string, field: string }>
				const errorsFields = {} as Record<string, string>
				responseErrors.forEach(item => {
					errorsFields[item.field] = item.message
				})
			}
		},
	})
	return api
}