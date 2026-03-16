import { env } from "../core/env";

export const aliyun = {
	accessKeyId: env('ALIYUN_ACCESS_KEY_ID', ''),
	accessKeySecret: env('ALIYUN_ACCESS_KEY_SECRET', ''),
}