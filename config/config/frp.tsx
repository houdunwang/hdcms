import { env } from "../core/env";

export const frp = {
	clientUrl: env('FRP_CLIENT_URL', ''),
	serverUrl: env('FRP_SERVER_URL', ''),
} as const

