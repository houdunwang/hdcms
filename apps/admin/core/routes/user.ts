import { middleware } from '#start/kernel'
import { throttle } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const UsersController = () => import('#core/controllers/users_controller')

// 登录注册
router
	.group(() => {
		router.put('/users/password', [UsersController, 'password']).use(middleware.auth())
		router.get('/users/me', [UsersController, 'me']).use(middleware.auth())

		router.post('/users/avatar', [UsersController, 'avatar']).use(middleware.auth())
		router.put('/users/:id?', [UsersController, 'update']).use(middleware.auth())
		router.delete('/users/:id?', [UsersController, 'destroy']).use(middleware.admin())
		router.resource('/users', UsersController).use(['update', 'destroy'], middleware.auth()).apiOnly().except(['update', 'destroy'])
	})
	.prefix('core')
	.use([throttle])