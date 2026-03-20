/**
 * 作者: 向军大叔
 * 邮箱: 2300071698@qq.com
 * 直播: 抖音、B站 搜索 后盾云
 */
import { CodeService } from '#core/services/code_service'
import { UploadService } from '#core/services/upload_service'
import { bindEmailValidator, bindMobileValidator } from '#core/validators/bind'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.ts'
import BindPolicy from '#core/policies/bind_policy'
@inject()
export default class BindsController extends BaseController {
  constructor(protected ctx: HttpContext, protected uploadService: UploadService, private codeService: CodeService) {
    super()
  }

  /**
   * @email
   * @tag 绑定帐号
   * @operationId bindEmail
   * @summary 绑定邮箱
   * @description 绑定邮箱
   * @requestFormDataBody { "account": { "type": "string", "description": "请输入邮箱", "example": "", "required": "true" }, "code": { "type": "string", "description": "邮箱收到的验证码", "example": "", "required": "true" } }
   * @responseBody 200 - { "success": true, "message": "绑定成功" }
   */
  async email({ bouncer, request, auth }: HttpContext) {
    await bouncer.with(BindPolicy).authorize('email', auth.user!)
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
   * @tag 绑定帐号
   * @operationId bindMobile
   * @summary 绑定手机号
   * @description 绑定手机号
   * @requestFormDataBody { "mobile": { "type": "string", "description": "请输入手机号", "example": "", "required": "true" }, "code": { "type": "string", "description": "手机号收到的验证码", "example": "", "required": "true" } }
   * @responseBody 200 - { "success": true, "message": "绑定成功" }
   */
  async mobile({ bouncer, request, auth }: HttpContext) {
    await bouncer.with(BindPolicy).authorize('mobile', auth.user!)

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
