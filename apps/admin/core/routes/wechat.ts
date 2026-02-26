import router from "@adonisjs/core/services/router";
const WechatsController = () => import('#core/wechat/wechats_controller')
const LoginController = () => import('#core/wechat/login_controller')
const BindController = () => import('#core/wechat/bind_controller')


router.group(() => {
	router.any('/', [WechatsController])
	router.post('/login/qr', [LoginController, 'loginQrCode'])
	router.post('/login', [LoginController, 'login'])

	// 绑定微信
	router.post('/bind/qr', [BindController, 'loginQrCode'])
	router.post('/bind', [BindController, 'bind'])
}).prefix('/core/wechat')