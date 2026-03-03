import router from '@adonisjs/core/services/router'
const BindsController = () => import('#core/controllers/binds_controller')

router.group(() => {
	// 绑定邮箱
	router.post('/email', [BindsController, 'email'])
}).prefix('core/bind')
