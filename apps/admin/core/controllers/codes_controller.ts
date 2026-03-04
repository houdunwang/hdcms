import { CodeService } from '#core/services/code_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.js'
import { sendEmailCodeValidator, sendMobileCodeValidator } from '#core/validators/code'

@inject()
export default class CodesController extends BaseController {
  constructor(
    protected ctx: HttpContext,
    private codeService: CodeService
  ) {
    super()
  }

  /**
   * @send
   * @tag 系统功能
   * @operationId sendCode
   * @summary 发送验证码
   * @description 发送验证码到指定的邮箱或手机号
   * @requestFormDataBody { "account": { "type": "string", "required": "true", "description": "邮箱或手机号" ,"example":"2300071698@qq.com" } }
   * @responseBody 200 - { "success": true, "message": "验证码发送成功" }
   */
  public async email({ request, auth }: HttpContext) {
    const { email } = await request.validateUsing(sendEmailCodeValidator, {
      meta: {
        isAuthenticated: auth.isAuthenticated,
      }
    })
    await this.codeService.send('email', email)
    return this.success('验证码发送成功', { remainingSeconds: 60 })
  }


  /**
  * @send
  * @tag 系统功能
  * @operationId sendCode
  * @summary 发送验证码
  * @description 发送验证码到指定的邮箱或手机号
  * @requestFormDataBody { "account": { "type": "string", "required": "true", "description": "邮箱或手机号" ,"example":"2300071698@qq.com" } }
  * @responseBody 200 - { "success": true, "message": "验证码发送成功" }
  */
  public async mobile({ request, auth }: HttpContext) {
    const { mobile } = await request.validateUsing(sendMobileCodeValidator, {
      meta: {
        isAuthenticated: auth.isAuthenticated,
      }
    })
    await this.codeService.send('mobile', mobile)
    return this.success('验证码发送成功')
  }
}
