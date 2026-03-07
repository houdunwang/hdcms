import User from '#models/user'
import cache from '@adonisjs/cache/services/main'
import type Wechat from '@hd/wechat'

export default class LoginProcess {
  constructor(private wechat: Wechat) {}

  /**
   * 处理微信扫码登录事件
   * @returns
   */
  async handle() {
    const wechat = this.wechat

    if (wechat.isScan()) {
      const ticket = wechat.message.Ticket
      const isLoginEvent = wechat.message.EventKey?.includes('login')

      if (isLoginEvent && ticket) {
        await this.login(ticket, wechat.message.FromUserName)
        return this.wechat.services.reply.text('登录成功')
      }
    }
  }

  /**
   * 根据 ticket 和 openid 执行登录操作
   * @param ticket 微信推送的 ticket
   * @param openid 用户 openid
   * @returns
   */
  async login(ticket: string, openid: string) {
    const userInfo = await this.wechat.services.userInfo.get(this.wechat.message.FromUserName)

    const user = await User.updateOrCreate(
      { openid },
      {
        nickname: userInfo.nickname,
        avatar: userInfo.headimgurl,
      }
    )
    if (user) {
      await cache.set({ key: ticket, value: user.id, ttl: '10m' })
    }
  }
}
