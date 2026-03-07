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
   * @findPassword
   * @tag 登录注册
   * @summary 找回密码
   * @operationId register
   * @description 找回密码
   * @requestFormDataBody { "email": { "type": "string", "minLength": 3, "maxLength": 20, "required": "true" }, "password": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" }, "password_confirmation": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" } }
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  async email({ request, serialize, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(findPasswordByEmailValidator, {
      meta: {
        codeService: this.codeService,
        type: 'email',
      },
    })
    const user = await User.findByOrFail('email', email)
    await user.merge({ password }).save()
    const token = await auth.use('api').createToken(user)
    return serialize({
      user: UserTransformer.transform(await user.refresh(), auth),
      token: token.value!.release(),
    })
  }

  /**
   * @findPassword
   * @tag 登录注册
   * @summary 找回密码
   * @operationId register
   * @description 找回密码
   * @requestFormDataBody { "email": { "type": "string", "minLength": 3, "maxLength": 20, "required": "true" }, "password": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" }, "password_confirmation": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" } }
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  async mobile({ request, serialize, auth }: HttpContext) {
    const { mobile, password } = await request.validateUsing(findPasswordByMobileValidator, {
      meta: {
        codeService: this.codeService,
        type: 'mobile',
      },
    })
    const user = await User.findByOrFail('mobile', mobile)
    await user.merge({ password }).save()
    const token = await auth.use('api').createToken(user)
    return serialize({
      user: UserTransformer.transform(await user.refresh(), auth),
      token: token.value!.release(),
    })
  }
}
