import BaseController from '../controllers/bases_controller.js'
import { WechatService } from '../services/wechat_service.js'
import User from '#models/user'
import UserTransformer from '#transformers/user_transformer'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class WechatBindController extends BaseController {
  constructor(
    protected wechatService: WechatService,
    protected ctx: HttpContext
  ) {
    super()
  }

  /**
   * @bind
   * @tag 微信绑定
   * @summary 绑定微信
   * @description 用户扫码后，使用 ticket 换取 openid 并绑定到当前用户
   * @requestBody { "ticket": "string" }
   * @responseBody 200 - { status: 'success' | 'waiting' }
   */
  async bind({ auth, serialize }: HttpContext) {
    const openid = await this.wechatService.getQrDataByTicket()
    const user = auth.getUserOrFail()
    if (openid) {
      const existUser = await User.query().where('openid', openid).whereNot('id', user.id).first()
      if (!existUser) {
        user.openid = openid
        await user.save()
        return serialize(UserTransformer.transform(user, auth))
      }
    }
  }
}
