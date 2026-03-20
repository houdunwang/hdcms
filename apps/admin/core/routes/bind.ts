import { middleware } from '#start/kernel'
import { apiLimiter } from '#start/limiter'
import router from '@adonisjs/core/services/router'
const BindsController = () => import('#core/controllers/binds_controller')

router.group(() => {
  router.post('/email', [BindsController, 'email']).use([apiLimiter('email-bind')])
  router.post('/mobile', [BindsController, 'mobile']).use([apiLimiter('mobile-bind')])
}).prefix('core/bind').use([middleware.auth()])
