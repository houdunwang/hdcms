import { env } from "../core/env";
import { pathResolve } from "../core/helper";

export const wepay = {
	appId: env('WECHAT_APP_ID', ''),
	mchId: env('WECHAT_MCH_ID', ''),
	key: env('WECHAT_KEY', 'yahooo@baidu'),
	publicKey: pathResolve(import.meta.url, '../pay/wepay/apiclient_cert.pem'),
	// 公钥
	// privateKey: pathResolve( '../pay/wepay/apiclient_key.pem'),
}
