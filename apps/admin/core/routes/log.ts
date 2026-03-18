import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const LogsController = () => import('#core/controllers/logs_controller')

router.get('/core/logs', [LogsController]).use([middleware.admin()])
