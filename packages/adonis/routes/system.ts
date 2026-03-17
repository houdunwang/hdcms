import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const SystemController = () => import('../controllers/systems_controller.js')

// 重启应用
router.post('/core/restart', [SystemController, 'restart']).use([middleware.admin()])
