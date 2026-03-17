import { apiLimiter } from '#start/limiter'
import router from '@adonisjs/core/services/router'
const WechatsMessageController = () => import('../wechat/wechats_message_controller.js')
const WechatLoginController = () => import('../wechat/wechat_login_controller.js')
const WechatBindController = () => import('../wechat/wechat_bind_controller.js')
const WechatQrsController = () => import('../wechat/wechat_qrs_controller.js')

router
  .group(() => {
    router.any('/message', [WechatsMessageController, 'handle'])
    router.post('/createQr', [WechatQrsController, 'create']).use([apiLimiter('create-qr', 30, 1)])
    router
      .post('/login', [WechatLoginController, 'login'])
      .use([apiLimiter('wechat-scan-login', 30, 1)])
    router.post('/bind', [WechatBindController, 'bind'])
  })
  .prefix('/core/wechat')
