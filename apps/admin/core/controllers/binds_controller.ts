import { UploadService } from '#core/services/upload_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.ts'
import { bindEmailValidator } from '#core/validators/bind'
@inject()
export default class BindsController extends BaseController {
  constructor(protected ctx: HttpContext, protected uploadService: UploadService) {
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
        user: auth.user
      }
    })
    const user = auth.user!
    user.email = payload.account
    await user.save()
    return this.success('绑定成功')
  }
}
