import BaseController from '#core/controllers/bases_controller'
import { WechatService } from '#core/services/wechat_service'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class WechatloginController extends BaseController {
  constructor(
    protected wechatService: WechatService,
    protected ctx: HttpContext
  ) {
    super()
  }

  /**
   * @login
   * @tag 微信登录
   * @operationId login
   * @requestBody { "ticket": "string" }
   * @responseBody 200 - { token: string, user: User }
   * @summary 使用 ticket 登录
   * @description 用户扫码后，微信服务器会携带 ticket 请求回调地址，使用 ticket 从缓存中获取 userId，然后完成登录
   */
  async login({ auth, serialize }: HttpContext) {
    const userId = await this.wechatService.getQrDataByTicket()
    if (userId) {
      const user = await User.find(userId)
      if (user) {
        const token = await auth.use('api').createToken(user)
        return serialize({
          user: UserTransformer.transform(await user.refresh(), auth),
          token: token.value!.release(),
        })
      }
    }
    return serialize({ user: undefined, token: undefined })
  }
}
