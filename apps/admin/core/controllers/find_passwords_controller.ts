// import type { HttpContext } from '@adonisjs/core/http'
import BaseController from '#core/controllers/bases_controller'
import { CodeService } from '#core/services/code_service'
import {
  findPasswordByEmailValidator,
  findPasswordByMobileValidator,
} from '#core/validators/findPassword'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class FindPasswordsController extends BaseController {
  constructor(
    protected ctx: HttpContext,
    private codeService: CodeService
  ) {
    super()
  }

  /**
   * @email
   * @tag 找回密码
   * @summary 使用邮箱找回密码
   * @operationId email
   * @description 使用邮箱找回密码
   * @requestFormDataBody { "email": { "type": "string", "minLength": 3, "maxLength": 20, "required": "true" }, "password": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" }, "password_confirmation": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" },"code": { "type": "string", "minLength": 6, "maxLength": 6, "required": "true" } }
   * @responseBody 200 - { "token":"string", "user": "User" }
   */
  async email({ request, serialize, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(findPasswordByEmailValidator, {
      meta: {
        codeService: this.codeService
      },
    })
    const user = await User.findByOrFail('email', email)
    await user.merge({ password }).save()
    await auth.use('web').login(user)
    const token = await auth.use('api').createToken(user)
    return serialize({
      user: UserTransformer.transform(await user.refresh(), auth),
      token: token.value!.release(),
    })
  }

  /**
   * @mobile
   * @operationId mobile
   * @tag 找回密码
   * @summary 短信找回
   * @description 使用短信找回密码
   * @requestFormDataBody { "email": { "type": "string", "minLength": 3, "maxLength": 20, "required": "true" }, "password": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" }, "password_confirmation": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" } }
   * @responseBody 200 - { "token":"string", "user": "User" }
   */
  async mobile({ request, serialize, auth }: HttpContext) {
    const { mobile, password } = await request.validateUsing(findPasswordByMobileValidator, {
      meta: {
        codeService: this.codeService,
      },
    })
    const user = await User.findByOrFail('mobile', mobile)
    await user.merge({ password }).save()
    await auth.use('web').login(user)
    const token = await auth.use('api').createToken(user)
    return serialize({
      user: UserTransformer.transform(await user.refresh(), auth),
      token: token.value!.release(),
    })
  }
}
