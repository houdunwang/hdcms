import UsersController from '../controllers/users_controller.js'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const AdminController = () => import('../controllers/admin_controller.js')
router.get('/hd', [UsersController, 'test']);
router
  .group(() => {
    router.get('/admin', [AdminController]).use([middleware.admin()])
  })
  .prefix('/core')
