import router from '@adonisjs/core/services/router'

const FindPasswordsController = () => import('#controllers/find_passwords_controller')
// 登录注册
router
  .group(() => {
    router.post('/email', [FindPasswordsController, 'email'])
    router.post('/mobile', [FindPasswordsController, 'mobile'])
  })
  .prefix('core/findPassword')
