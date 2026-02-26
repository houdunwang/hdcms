import hdConfig from '#config/hd'
import env from '#start/env'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { Wechat } from '@hd/wechat'

@inject()
export default class WechatsController {
  constructor(protected wechat: Wechat) { }

  /**
   * @handle
   * @tag 微信消息
   * @summary 微信消息和事件处理
   * @description 统一处理微信服务器发送的消息和事件，包括服务器验证、消息接收、事件推送等。
   * @param {object} request - HTTP 请求对象，包含微信服务器推送的数据。
   * @responseBody 200 - text/plain - 微信服务器要求返回的响应内容，如 "success" 或空字符串。
   */
  async handle({ request }: HttpContext) {
    const config = {
      token: env.get('WECHAT_TOKEN'),
      appid: env.get('WECHAT_APP_ID'),
      secret: env.get('WECHAT_APP_SECRET'),
    };
    await this.wechat.init(config)
    this.wechat.parse(request.raw())
    const processResult = await this.processHandle()
    return processResult ?? this.defaultReply()
  }

  async processHandle() {
    for (const Process of hdConfig.wechatProcess) {
      const process = new Process(this.wechat)
      const result = await process.handle()
      if (result as unknown as string) return result
    }
  }

  async defaultReply() {
    return this.wechat.services.reply.text(env.get('WECHAT_DEFAULT_REPLY', '欢迎回家'))
  }
}
