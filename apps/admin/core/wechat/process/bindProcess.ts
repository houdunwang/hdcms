import cache from '@adonisjs/cache/services/main'
import type Wechat from '@hdcms/wechat'

export default class BindProcess {
  constructor(private wechat: Wechat) {}

  /**
   * 处理微信扫码登录事件
   * @returns
   */
  async handle() {
    const wechat = this.wechat
    if (wechat.isScan()) {
      const ticket = wechat.message.Ticket
      const isBindEvent = wechat.message.EventKey?.includes('bind')

      if (isBindEvent && ticket) {
        await this.bind(ticket, wechat.message.FromUserName)
        return wechat.services.reply.text('绑定成功')
      }
    }
  }

  /**
   * 根据 ticket 和 openid 执行登录操作
   * @param ticket 微信推送的 ticket
   * @param openid 用户 openid
   * @returns
   */
  async bind(ticket: string, openid: string) {
    cache.set({ key: ticket, value: openid, ttl: '1m' })
  }
}
