import { apiLimiter } from "#start/limiter";
import router from "@adonisjs/core/services/router";
const WechatsMessageController = () => import('#core/wechat/wechats_message_controller')
const WechatLoginController = () => import('#core/wechat/wechat_login_controller')
const WechatBindController = () => import('#core/wechat/wechat_bind_controller')
const WechatQrsController = () => import('#core/wechat/wechat_qrs_controller')


router.group(() => {
	router.any('/message', [WechatsMessageController, 'handle'])
	router.post('/createQr', [WechatQrsController, 'create']).use([apiLimiter('create-qr', 30, 1)])
	router.post('/login', [WechatLoginController, 'login']).use([apiLimiter('wechat-scan-login', 30, 1)])
	router.post('/bind', [WechatBindController, 'bind'])
}).prefix('/core/wechat')