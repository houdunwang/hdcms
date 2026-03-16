import { env } from "../core/env";

export const sms = {
	codeSign: env('ALIYUN_SMS_CODE_SIGN', ''),
	codeTemplate: env('ALIYUN_SMS_CODE_TEMPLATE', ''),
	testUserMobile: env('TEST_USER_MOBILE', ''),
}