import { getUserByName } from '#core/helper'
import { findPasswordValidator, loginValidator, registerValidator } from '#core/validators/auth'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { errors } from '@vinejs/vine'
import BaseController from './bases_controller.js'
@inject()
export default class AuthController extends BaseController {
  constructor(protected ctx: HttpContext) {
    super()
  }

  /**
   * @login
   * @tag 登录注册
   * @operationId login
   * @summary 用户登录
   * @description 用户登录，支持邮箱、手机号、帐号登录
   * @requestFormDataBody { "account": { "type": "string", "description": "登录帐号、手机号、邮箱", "example": "admin", "required": "true" }, "password": { "type": "string", "description": "登录密码", "example": "admin888", "required": "true" } , "captcha": { "type": "string", "description": "验证码", "example": "" }, "captcha_key": { "type": "string", "description": "验证码key", "example": "" }}
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  public async login({ request, serialize, auth }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const user = await getUserByName(payload.account)
    if (!user) {
      throw new errors.E_VALIDATION_ERROR([{ message: '账号不存在', field: 'account' }])
    }
    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user, user),
      token: token.value!.release(),
    })
  }

  /**
   * @logout
   * @tag 登录注册
   * @summary 退出
   * @operationId logout
   * @description 用户退出登录
   * @responseBody 200 - { success: true, message: 'User logged out' }
   */
  async logout({ auth, response }: HttpContext) {
    const user = auth.getUserOrFail()
    if (user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
    await auth.use('web').logout()
    return response.ok({ success: true, message: 'User logged out' })
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
  async register({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)
    const user = new User()
    await user.fill(payload).save()
    const token = await auth.use('api').createToken(user)
    return { token, user }
  }

  /**
   * @register
   * @tag 登录注册
   * @summary 找回密码
   * @operationId register
   * @description 找回密码
   * @requestFormDataBody { "name": { "type": "string", "minLength": 3, "maxLength": 20, "required": "true" }, "password": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" }, "password_confirmation": { "type": "string", "minLength": 5, "maxLength": 20, "required": "true" } }
   * @responseBody 200 - { "token":{"type": "string", "token": "string"}, "user": "<User>" }
   */
  async findPassword({ request, response }: HttpContext) {
    const payload = await request.validateUsing(findPasswordValidator)
    const user = await getUserByName(payload.account)
    if (!user) {
      throw new Error('用户不存在')
    }
    await user.fill({ password: payload.password }).save()
    return response.ok({ success: true, message: '密码重置成功' })
  }
}
