import { inject } from '@adonisjs/core'
// import type { HttpContext } from '@adonisjs/core/http'

import BaseController from '#core/controllers/bases_controller'
import { WechatService } from '#core/services/wechat_service'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class WechatQrsController extends BaseController {
  constructor(
    protected wechatService: WechatService,
    protected ctx: HttpContext
  ) {
    super()
  }

  /**
   * @create
   * @tag 微信二维码
   * @operationId create
   * @summary 生成微信二维码
   * @description 生成微信二维码
   * @responseBody 200 - { ticket: string, expire_seconds: number, url: string }
   */
  async create({ request }: HttpContext) {
    await this.wechatService.init()
    // await new Promise(r => {
    // 	setTimeout(() => {
    // 		r('')
    // 	}, 3000)
    // })
    const res = await this.wechatService.wechat.services.qr.createQRCode({
      action_name: 'QR_STR_SCENE',
      action_info: {
        scene: {
          scene_str: request.input('scene_str'),
        },
      },
    })
    return res
  }
}
