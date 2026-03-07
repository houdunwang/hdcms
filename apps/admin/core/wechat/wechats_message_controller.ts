import hdConfig from '#config/hd'
import { WechatService } from '#core/services/wechat_service'
import env from '#start/env'
import { inject } from '@adonisjs/core'

@inject()
export default class WechatsMessageController {
  constructor(protected WechatService: WechatService) { }

  /**
   * @handle
   * @tag 微信消息
   * @summary 微信消息和事件处理
   * @description 统一处理微信服务器发送的消息和事件，包括服务器验证、消息接收、事件推送等。
   * @param {object} request - HTTP 请求对象，包含微信服务器推送的数据。
   * @responseBody 200 - text/plain - 微信服务器要求返回的响应内容，如 "success" 或空字符串。
   */
  async handle() {
    const isBindRequest = await this.WechatService.init()
    console.log('isBindRequest', isBindRequest)
    if (isBindRequest) return isBindRequest

    const processResult = await this.processHandle()
    return processResult ?? this.defaultReply()
  }

  async processHandle() {
    for (const Process of hdConfig.wechatProcess) {
      const process = new Process(this.WechatService.wechat)
      const result = await process.handle()
      if (result) return result
    }
  }

  async defaultReply() {
    return this.WechatService.wechat.services.reply.text(
      env.get('WECHAT_DEFAULT_REPLY', '欢迎回家')
    )
  }
}
