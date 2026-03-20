import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const PackagesController = () => import('#core/controllers/packages_controller')

// 登录注册
router.group(() => {
  router.resource('package', PackagesController).apiOnly().use(['update', 'destroy', 'store', 'show'], middleware.admin())
}).prefix('core')
