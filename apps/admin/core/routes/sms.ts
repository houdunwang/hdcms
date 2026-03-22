import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const SmsController = () => import('#core/controllers/sms_controller')

router.group(() => {
	router.post('/test', [SmsController, 'test']).use([middleware.admin()])
}).prefix('/core/sms')