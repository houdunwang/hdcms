import BaseController from '#core/controllers/bases_controller';
import env from '#start/env';
import cache from '@adonisjs/cache/services/main';
import { inject } from '@adonisjs/core';
import type { HttpContext } from '@adonisjs/core/http';
import { Wechat } from '@hd/wechat';

@inject()
export default class WechatBindController extends BaseController {
  constructor(protected wechat: Wechat, protected ctx: HttpContext) {
    super()
  }

  /**
  * @loginQrCode
  * @tag 微信绑定
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
          scene_str: 'wechat-bind',
        }
      }
    })
    return res
  }

  /**
   * @bind
   * @tag 微信绑定
   * @summary 绑定微信
   * @description 用户扫码后，使用 ticket 换取 openid 并绑定到当前用户
   * @requestBody { "ticket": "string" }
   * @responseBody 200 - { status: 'success' | 'waiting' }
   */
  async bind({ request, auth }: HttpContext) {
    const ticket = request.input('ticket')
    const openid = await cache.get(ticket)
    const user = auth.getUserOrFail()
    if (openid) {
      user.openid = openid
      await user.save()
      return this.success('绑定成功', { status: 'success' })
    }

    return this.success('等待扫码', { status: 'waiting' })
  }
}
