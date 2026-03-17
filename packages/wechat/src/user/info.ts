import Wechat from "../index.js";
import { IWechatUserInfo } from "../types/user.js";

export class UserInfo {
	/**
	 * 构造函数
	 * @param wechat Wechat 实例
	 */
	constructor(protected wechat: Wechat) { }

	/**
	 * 获取用户信息
	 * @param openid 用户的 openid
	 */
	public async get(openid: string): Promise<IWechatUserInfo> {
		const res = await fetch(`${this.wechat.wechatHost}/user/info?access_token=${this.wechat.accessToken}&openid=${openid}&lang=zh_CN`)
		const data = await res.json() as IWechatUserInfo
		return data
	}
}