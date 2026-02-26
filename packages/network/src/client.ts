import { type FetchOptions, ofetch } from "ofetch"

export type RequestOptions = Omit<FetchOptions<"json", any>, "method">

export type CreateClientOptions = {
	baseURL: string
	getToken?: () => string | Promise<string> | undefined
	defaultHeaders?: Record<string, string>
	retry?: number
	retryDelay?: number
	retryStatusCodes?: number[]
	onRequest?: (ctx: any) => void | Promise<void>
	onResponse?: (ctx: any) => void | Promise<void>
	onResponseError?: (ctx: any) => void | Promise<void>
	onUnauthorized?: (ctx: any) => void | Promise<void>
	refreshToken?: () => Promise<void>
}

export type NetworkClient = {
	get<T>(url: string, options?: RequestOptions): Promise<T>
	post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T>
	put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T>
	patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T>
	delete<T>(url: string, options?: RequestOptions): Promise<T>
	raw<T>(url: string, options?: FetchOptions<"json", any>): Promise<T>
}

export function createClient(options: CreateClientOptions): NetworkClient {
	const {
		baseURL,
		getToken,
		defaultHeaders = {},
		retry = 1,
		retryDelay = 500,
		retryStatusCodes = [404, 500],
		onRequest: userOnRequest,
		onResponse: userOnResponse,
		onResponseError: userOnResponseError,
		onUnauthorized,
		refreshToken,
	} = options

	const $ = ofetch.create({
		baseURL,
		retry,
		retryDelay,
		retryStatusCodes,
		onRequest: async (ctx: any) => {
			const { options } = ctx
			const token = await getToken?.()
			const h = new Headers(options.headers as HeadersInit)
			h.set("accept", "application/json")
			for (const [k, v] of Object.entries(defaultHeaders)) {
				h.set(k, v)
			}
			if (token) {
				h.set("authorization", `Bearer ${token}`)
			}
			options.headers = h
			if (userOnRequest) await userOnRequest(ctx)
		},
		onResponse: async (ctx: any) => {
			if (userOnResponse) await userOnResponse(ctx)
		},
		onResponseError: async (ctx: any) => {
			const status = ctx.response?.status
			if (status === 401 && onUnauthorized) {
				await onUnauthorized(ctx)
			}
			if (userOnResponseError) await userOnResponseError(ctx)
		},
	})

	let refreshing: Promise<void> | null = null
	let refreshFailed = false
	const ensureRefresh = async () => {
		if (!refreshToken) return
		if (!refreshing) {
			refreshing = (async () => {
				try {
					await refreshToken()
				} catch (err) {
					refreshFailed = true
					throw err
				} finally {
					refreshing = null
				}
			})()
		}
		await refreshing
	}

	const withAutoRefresh = async <T>(fn: () => Promise<T>) => {
		try {
			return await fn()
		} catch (e: any) {
			const status = e?.response?.status ?? e?.status
			if (status === 401 && refreshToken) {
				if (refreshFailed) {
					throw e
				}
				await ensureRefresh()
				return await fn()
			}
			throw e
		}
	}

	const get = async <T>(url: string, options?: RequestOptions) => {
		return withAutoRefresh(() => $<T>(url, { ...options, method: "GET" }))
	}

	const post = async <T>(url: string, body?: any, options?: RequestOptions) => {
		return withAutoRefresh(() => $<T>(url, { ...options, method: "POST", body }))
	}

	const put = async <T>(url: string, body?: any, options?: RequestOptions) => {
		return withAutoRefresh(() => $<T>(url, { ...options, method: "PUT", body }))
	}

	const patch = async <T>(url: string, body?: any, options?: RequestOptions) => {
		return withAutoRefresh(() => $<T>(url, { ...options, method: "PATCH", body }))
	}

	const del = async <T>(url: string, options?: RequestOptions) => {
		return withAutoRefresh(() => $<T>(url, { ...options, method: "DELETE" }))
	}

	const raw = async <T>(url: string, options?: FetchOptions<"json", any>) => {
		return withAutoRefresh(() => $<T>(url, options))
	}

	return {
		get,
		post,
		put,
		patch,
		delete: del,
		raw,
	}
}

export function createQueryFn<T>(
	client: NetworkClient,
	url: string,
	options?: RequestOptions
) {
	return async () => client.get<T>(url, options)
}

export function createMutationFn<TInput, TOutput>(
	client: NetworkClient,
	method: "POST" | "PUT" | "PATCH" | "DELETE",
	url: string,
	options?: RequestOptions
) {
	return async (input?: TInput) => {
		if (method === "POST") return client.post<TOutput>(url, input, options)
		if (method === "PUT") return client.put<TOutput>(url, input, options)
		if (method === "PATCH") return client.patch<TOutput>(url, input, options)
		return client.delete<TOutput>(url, options)
	}
}

export async function api<T>(
	url: string,
	options: FetchOptions<"json", any> & {
		baseURL?: string
		retry?: number
		retryDelay?: number
		retryStatusCodes?: number[]
	} = {}
) {
	const { retry = 3, retryDelay = 500, retryStatusCodes = [404, 500], ...rest } = options
	return ofetch<T>(url, {
		retry,
		retryDelay,
		retryStatusCodes,
		...rest,
	})
}
