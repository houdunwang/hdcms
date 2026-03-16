import { env } from "../core/env";

export const email = {
	host: env('SMTP_HOST', ''),
	port: env('SMTP_PORT', ''),
	username: env('SMTP_USERNAME', ''),
	password: env('SMTP_PASSWORD', ''),
	testUserEmail: env('TEST_USER_EMAIL', ''),
}
