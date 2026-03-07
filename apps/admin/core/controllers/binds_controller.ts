import { CodeService } from '#core/services/code_service'
import { UploadService } from '#core/services/upload_service'
import { bindEmailValidator, bindMobileValidator } from '#core/validators/bind'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.ts'
@inject()
export default class BindsController extends BaseController {
  constructor(
    protected ctx: HttpContext,
    protected uploadService: UploadService,
    private codeService: CodeService
  ) {
    super()
  }

  /**
   * @email
   * @tag 绑定邮箱
   * @operationId bindEmail
   * @summary 绑定邮箱
   * @description 绑定邮箱
   * @requestFormDataBody { "account": { "type": "string", "description": "请输入邮箱", "example": "", "required": "true" }, "code": { "type": "string", "description": "邮箱收到的验证码", "example": "", "required": "true" } }
   * @responseBody 200 - { "success": true, "message": "绑定成功" }
   */
  async email({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(bindEmailValidator, {
      meta: {
        user: auth.user,
        type: 'email',
        codeService: this.codeService,
      },
    })
    const user = auth.user!
    user.email = payload.email
    await user.save()
    return this.success('绑定成功')
  }

  /**
   * @mobile
   * @tag 绑定手机号
   * @operationId bindMobile
   * @summary 绑定手机号
   * @description 绑定手机号
   * @requestFormDataBody { "mobile": { "type": "string", "description": "请输入手机号", "example": "", "required": "true" }, "code": { "type": "string", "description": "手机号收到的验证码", "example": "", "required": "true" } }
   * @responseBody 200 - { "success": true, "message": "绑定成功" }
   */
  async mobile({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(bindMobileValidator, {
      meta: {
        user: auth.user,
        codeService: this.codeService,
      },
    })
    const user = auth.user!
    await user.merge({ mobile: payload.mobile }).save()
    return this.success('绑定成功')
  }
}
