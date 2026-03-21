
import { CodeService } from '#core/services/code_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.js'
import { sendEmailCodeValidator, sendMobileCodeValidator } from '#core/validators/code'

@inject()
export default class CodesController extends BaseController {
  constructor(protected ctx: HttpContext, private codeService: CodeService) {
    super()
  }

  /**
   * @email
   * @tag 发送验证码
   * @operationId email
   * @summary 发送邮件验证码
   * @description 发送邮件验证码
   * @requestFormDataBody { "account": { "type": "string", "required": "true", "description": "邮箱或手机号" ,"example":"2300071698@qq.com" } }
   * @responseBody 200 - { "success": true, "message": "验证码发送成功" }
   */
  public async email({ request, auth, serialize }: HttpContext) {
    const { email } = await request.validateUsing(sendEmailCodeValidator, {
      meta: {
        isAuthenticated: auth.isAuthenticated,
      },
    })
    await this.codeService.send('email', email)
    return serialize({ remainingSeconds: 60 })
  }

  /**
   * @mobile
   * @tag 发送验证码
   * @operationId mobile
   * @summary 发送短信验证码
   * @description 发送短信验证码
   * @requestFormDataBody { "account": { "type": "string", "required": "true", "description": "邮箱或手机号" ,"example":"2300071698@qq.com" } }
   * @responseBody 200 - { "success": true, "message": "验证码发送成功" }
   */
  public async mobile({ request, auth, serialize }: HttpContext) {
    const { mobile } = await request.validateUsing(sendMobileCodeValidator, {
      meta: {
        isAuthenticated: auth.isAuthenticated,
      },
    })
    await this.codeService.send('mobile', mobile)
    return serialize({ remainingSeconds: 60 })
  }
}
