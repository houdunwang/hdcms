import { throttle } from "#start/limiter";
import router from "@adonisjs/core/services/router";
const WechatsController = () => import('#core/wechat/wechats_controller')
const WechatLoginController = () => import('#core/wechat/wechat_login_controller')
const BindController = () => import('#core/wechat/bind_controller')


router.group(() => {
	router.any('/', [WechatsController])
	router.get('/login/qr', [WechatLoginController, 'loginQrCode']).use(throttle)
	router.post('/login', [WechatLoginController, 'login']).use(throttle)

	// 绑定微信
	router.post('/bind/qr', [BindController, 'loginQrCode'])
	router.post('/bind', [BindController, 'bind'])
}).prefix('/core/wechat')