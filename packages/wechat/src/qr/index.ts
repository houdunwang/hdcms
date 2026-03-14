import Wechat from "../index.js";
import qrcode from 'qrcode'
export interface IWechatQr {
	expire_seconds?: number;
	action_name: 'QR_SCENE' | 'QR_STR_SCENE' | 'QR_LIMIT_SCENE' | 'QR_LIMIT_STR_SCENE';
	action_info: {
		scene: {
			scene_id?: number;
			scene_str?: string;
		};
	};
}

export interface CreateQRCodeResponse {
	ticket: string;
	expire_seconds: number;
	url: string;
	qrImg: string;
}

export default class Qr {
	/**
		* 构造函数
		* @param wechat Wechat 实例
		*/
	constructor(protected wechat: Wechat) { }

	/**
		* 创建二维码
		* @param params 二维码参数
		* @returns 
		*/
	async createQRCode(params: IWechatQr): Promise<CreateQRCodeResponse> {
		const url = `https://api.weixin.qq.com/cgi-bin/qrcode/create?access_token=${this.wechat.accessToken}`;
		try {
			const response = await fetch(url, {
				method: 'POST',
				body: JSON.stringify(params),
				headers: { 'Content-Type': 'application/json' },
			});
			const res = await response.json()
			const qrImg = await qrcode.toDataURL(res.url)
			return { ...res, qrImg }
		} catch (error) {
			console.error('Error creating QR code:', error);
			throw error;
		}
	}

	/**
		* 通过 ticket 换取二维码
		* @param ticket 二维码 ticket
		*/
	async getQrImageByTicket(ticket: string) {
		const url = `https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=${ticket}`;
		try {
			const response = await fetch(url, {
				method: 'GET',
			});
			const res = await response.json()
		} catch (error) {
			console.error('Error getting QR image:', error);
			throw error;
		}
	}
}