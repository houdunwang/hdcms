import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const SystemController = () => import('#core/controllers/systems_controller')

// 重启应用
router.group(() => {
	router.post('/restart', [SystemController, 'restart']).use([middleware.admin()])
}).prefix('/core')
