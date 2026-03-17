import { env } from "../core/env";

export const client = {
	apiUrl: env('VITE_API_URL', ''),
} as const
