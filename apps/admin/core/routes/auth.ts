import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AuthController = () => import('#core/controllers/auth_controller')

// 登录注册
router
  .group(() => {
    // 登录注册
    router.post('/login', [AuthController, 'login'])
    router.post('/register', [AuthController, 'register'])
    router.post('/logout', [AuthController, 'logout']).use([middleware.auth()])
  })
  .prefix('core')
