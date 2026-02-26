import cache from "@adonisjs/cache/services/main";
import Wechat from "@hd/wechat";

export default class BindProcess {
	constructor(private wechat: Wechat) { }

	/**
	 * 处理微信扫码登录事件
	 * @returns
	 */
	async handle() {
		if (this.wechat.isScan()) {
			const isBindEvent = this.wechat.message.Ticket && this.wechat.message.EventKey?.includes('core-wechat-bind')
			if (isBindEvent) {
				await this.bind(this.wechat.message.Ticket as unknown as string, this.wechat.message.FromUserName)
				return this.wechat.services.reply.text('绑定成功')
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