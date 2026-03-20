/**
 * 作者: 向军大叔
 * 邮箱: 2300071698@qq.com
 * 直播: 抖音、B站 搜索 后盾云
 */
import { getUserByName } from '#core/helper'
import { loginValidator, registerValidator } from '#core/validators/auth'
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
   * @operationId login
   * @tag 登录注册
   * @summary 用户登录
   * @description 用户登录，支持邮箱、手机号、帐号登录
   * @requestFormDataBody { "account": { "type": "string", "description": "登录帐号、手机号、邮箱", "example": "admin", "required": "true" }, "password": { "type": "string", "description": "登录密码", "example": "admin888", "required": "true" } , "captcha": { "type": "string", "description": "验证码", "example": "" }, "captcha_key": { "type": "string", "description": "验证码key", "example": "" }}
   * @responseBody 200 - { "token":"string", "user": "User" }
   */
  async login({ request, serialize, auth }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const user = await getUserByName(payload.account)
    if (!user) {
      throw new errors.E_VALIDATION_ERROR([{ message: '账号不存在', field: 'account' }])
    }
    await auth.use('web').login(user)
    const token = await User.accessTokens.create(user)
    return serialize({
      user: UserTransformer.transform(user, auth),
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
    const token = await auth.use('api').createToken(user)
    return serialize({
      user: UserTransformer.transform(user, auth),
      token: token.value!.release(),
    })
  }
}
