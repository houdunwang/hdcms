import { middleware } from '#start/kernel'
import { throttle } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const UsersController = () => import('../controllers/users_controller.js')

// 登录注册
router
  .group(() => {
    router.get('/users/profile', [UsersController, 'profile']).use(middleware.auth())
    router.put('/users/password', [UsersController, 'password']).use(middleware.auth())
    router.put('/users/:id?', [UsersController, 'update']).use(middleware.auth())
    router.delete('/users/destroy', [UsersController, 'destroy']).use(middleware.auth())
    router
      .resource('/users', UsersController)
      .use(['update'], middleware.auth())
      .apiOnly()
      .except(['update', 'destroy'])
  })
  .prefix('core')
  .use([throttle])
