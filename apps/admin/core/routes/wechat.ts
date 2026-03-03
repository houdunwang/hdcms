import { throttle } from "#start/limiter";
import router from "@adonisjs/core/services/router";
const WechatsMessageController = () => import('#core/wechat/wechats_message_controller')
const WechatLoginController = () => import('#core/wechat/wechat_login_controller')
const WechatBindController = () => import('#core/wechat/wechat_bind_controller')
const WechatQrsController = () => import('#core/wechat/wechat_qrs_controller')


router.group(() => {
	router.any('/message', [WechatsMessageController])
	router.post('/createQr', [WechatQrsController, 'create']).use(throttle)
	router.post('/login', [WechatLoginController, 'login']).use(throttle)
	// 绑定微信
	// router.post('/bind/qr', [WechatBindController, 'loginQrCode'])
	router.post('/bind', [WechatBindController, 'bind'])
}).prefix('/core/wechat')