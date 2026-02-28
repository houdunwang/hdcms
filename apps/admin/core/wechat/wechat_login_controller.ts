import BaseController from '#core/controllers/bases_controller';
import User from '#models/user';
import env from '#start/env';
import UserTransformer from '#transformers/user_transformer';
import cache from '@adonisjs/cache/services/main';
import { inject } from '@adonisjs/core';
import { HttpContext } from '@adonisjs/core/http';
import { Wechat } from '@hd/wechat';

@inject()
export default class WechatloginController extends BaseController {
  constructor(protected wechat: Wechat, protected ctx: HttpContext) {
    super()
  }

  /**
   * @loginQrCode
   * @tag 微信登录
   * @operationId loginQrCode
   * @summary 获取微信登录二维码
   * @description 生成用于扫码登录的微信二维码
   * @responseBody 200 - { ticket: string, expire_seconds: number, url: string }
   */
  async loginQrCode({ }: HttpContext) {
    const config = {
      token: env.get('WECHAT_TOKEN'),
      appid: env.get('WECHAT_APP_ID'),
      secret: env.get('WECHAT_APP_SECRET'),
    };
    await this.wechat.init(config)
    const res = await this.wechat.services.qr.createQRCode({
      action_name: 'QR_STR_SCENE',
      action_info: {
        scene: {
          scene_str: 'core-wechat-login',
        }
      }
    })
    return res
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
  async login({ request, auth, serialize }: HttpContext) {
    const ticket = request.input('ticket')
    const userId = await cache.get({ key: ticket })
    if (userId) {
      const user = await User.find(userId)
      if (user) {
        const token = await auth.use('api').createToken(user)
        return serialize({
          user: UserTransformer.transform(await user.refresh(), user),
          token: token.value!.release()
        })
      }
    }
    return serialize({ user: undefined, token: undefined })
  }
}
