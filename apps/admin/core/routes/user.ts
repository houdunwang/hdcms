import { middleware } from '#start/kernel'
import { throttle } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const UsersController = () => import('#core/controllers/users_controller')

// 登录注册
router
	.group(() => {
		router.put('/users/password', [UsersController, 'password']).use(middleware.auth())
		router.get('/users/me', [UsersController, 'me']).use(middleware.auth())
		router.resource('/users', UsersController).use(['update', 'destroy'], middleware.auth()).apiOnly()
			.use(['update'], middleware.auth())
			.use(['destroy'], middleware.admin())
	})
	.prefix('core')
	.use([throttle])