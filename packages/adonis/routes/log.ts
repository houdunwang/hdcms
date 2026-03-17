import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const LogsController = () => import('../controllers/logs_controller.js')

router.get('/core/logs', [LogsController]).use([middleware.admin()])
