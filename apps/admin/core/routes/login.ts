import { apiLimiter } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const LoginController = () => import('#core/controllers/login_controller')

// 登录注册
router.group(() => {
  router.post('/login/name', [LoginController, 'name']).use([apiLimiter('auth-login')])
  router.post('/login/email', [LoginController, 'email']).use([apiLimiter('auth-login')])
  router.post('/login/mobile', [LoginController, 'mobile']).use([apiLimiter('auth-login')])
}).prefix('core')
