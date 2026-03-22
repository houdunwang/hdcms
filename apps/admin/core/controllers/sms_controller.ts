// import type { HttpContext } from '@adonisjs/core/http'

import { AliyunSmsService } from "#core/services/aliyun_sms_service"
import SmsPolicy from "#policies/sms_policy"
import env from "#start/env"
import { testSmsValidate } from "#validators/sms"
import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"

@inject()
export default class SmsController {
	constructor(private aliyunSmsService: AliyunSmsService) { }

	async test({ bouncer, request }: HttpContext) {
		await bouncer.with(SmsPolicy).authorize('test')
		const { mobile } = await request.validateUsing(testSmsValidate)
		await this.aliyunSmsService.sendSms(
			mobile,
			env.get('ALIYUN_SMS_CODE_SIGN')!, // 阿里云短信签名
			env.get('ALIYUN_SMS_CODE_TEMPLATE')!, // 模板代码
			{ code: '6666' } // 模板参数
		)
	}
}