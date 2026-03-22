import { MailService } from "#core/services/mail_service"
import { testEmailValidate } from "#core/validators/email"
import EmailPolicy from "#core/policies/email_policy"
import env from "#start/env"
import { inject } from "@adonisjs/core"
import { HttpContext } from "@adonisjs/core/http"


@inject()
export default class EmailsController {
	constructor(private mailService: MailService) { }

	async test({ bouncer, request }: HttpContext) {
		await bouncer.with(EmailPolicy).authorize('test')
		const { email } = await request.validateUsing(testEmailValidate)
		this.mailService.send(email, env.get('APP_NAME') + '<h1>测试邮件</h1>')
	}
}