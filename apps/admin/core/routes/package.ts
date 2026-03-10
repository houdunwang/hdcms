import router from '@adonisjs/core/services/router';
const PackagesController = () => import('#core/controllers/packages_controller');

// 登录注册
router.group(() => {
  router.resource('package', PackagesController).apiOnly()
}).prefix('core')
