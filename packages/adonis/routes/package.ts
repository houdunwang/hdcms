import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const PackagesController = () => import('../controllers/packages_controller.js')

// 登录注册
router.group(() => {
  router.resource('package', PackagesController).apiOnly().use(['update', 'destroy', 'store'], middleware.admin())
}).prefix('core')
