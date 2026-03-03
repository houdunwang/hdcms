import { CodeService } from '#core/services/code_service'
import { sendCodeValidator } from '#core/validators/code'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.js'

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
  public async send({ request, auth, params }: HttpContext) {
    const type = params.type as 'email' | 'mobile'
    const payload = await request.validateUsing(sendCodeValidator, {
      meta: {
        isAuthenticated: auth.isAuthenticated
      }
    })
    await this.codeService.send(payload.account)
    return this.success('验证码发送成功')
  }
}
