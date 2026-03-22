import { registerValidator } from '#core/validators/auth'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import BaseController from './bases_controller.js'
@inject()
export default class AuthController extends BaseController {
  constructor(protected ctx: HttpContext) {
    super()
  }

  /**
   * @logout
   * @tag 登录注册
   * @summary 退出
   * @operationId logout
   * @description 用户退出登录
   * @responseBody 200 - { success: true, message: 'User logged out' }
   */
  async logout({ auth }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
    await auth.use('web').logout()
  }

  /**
   * @register
   * @tag 登录注册
   * @summary 用户注册
   * @operationId register
   * @description 用户注册
   * @requestFormDataBody { "name": { "type": "string", "minLength": 3, "maxLength": 20, "required": "true" }, "password": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" }, "password_confirmation": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" } }
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  async register({ request, auth, serialize }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = new User()
    const { captcha, password_confirmation, ...userPayload } = payload
    await user.fill(userPayload).save()
    await auth.use('web').login(user)
    const token = await auth.use('api').createToken(user)
    return serialize({
      user: UserTransformer.transform(user, auth),
      token: token.value!.release(),
    })
  }
}
