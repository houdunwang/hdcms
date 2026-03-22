// import EmailsController from '#controllers/emails_controller'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const EmailsController = () => import('#core/controllers/emails_controller')

router.group(() => {
	router.post('/test', [EmailsController, 'test']).use([middleware.admin()])
}).prefix('/core/email')