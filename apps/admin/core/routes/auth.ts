import { middleware } from '#start/kernel'
import { apiLimiter } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#core/controllers/auth_controller')

// 登录注册
router.group(() => {
  router.post('/register', [AuthController, 'register']).use([apiLimiter('auth-register')])
  router.post('/logout', [AuthController, 'logout']).use([middleware.auth()]).use([apiLimiter('auth-logout')])
}).prefix('core')
