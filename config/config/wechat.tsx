import { env } from "../core/env";

export const wechat = {
	appId: env('WECHAT_APP_ID', ''),
	appSecret: env('WECHAT_APP_SECRET', ''),
	appToken: env('WECHAT_TOKEN', ''),
	defaultReply: env('WECHAT_DEFAULT_REPLY', ''),
}