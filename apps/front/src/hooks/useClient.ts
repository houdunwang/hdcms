import { createClient } from "@houdunyun/network";

type ClientType = { baseURL: string; getToken?: () => string }

export function useClient({ baseURL, getToken }: ClientType) {
	const client = createClient({
		baseURL,
		getToken: () => getToken ? getToken() : localStorage.getItem("token") || "",
	})
	return client
}