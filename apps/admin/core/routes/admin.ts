
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AdminController = () => import('../controllers/admin_controller.ts')

router.group(() => {
  router.get('/admin', [AdminController, 'index']).use([middleware.admin()])
}).prefix('/core')
