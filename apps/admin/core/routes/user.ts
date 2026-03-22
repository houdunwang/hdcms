import { middleware } from '#start/kernel'
import { apiLimiter, throttle } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const UsersController = () => import('#core/controllers/users_controller')

// 登录注册
router.group(() => {
  router.get('/users/profile', [UsersController, 'profile'])
  router.put('/users/password', [UsersController, 'password']).use([middleware.auth(), apiLimiter('users-password')])
  router.resource('/users', UsersController).use(['update', 'destroy', 'index'], middleware.auth()).apiOnly().except(['store'])
}).prefix('core').use([throttle])
