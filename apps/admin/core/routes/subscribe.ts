import router from '@adonisjs/core/services/router'
const SubscribesController = () => import('#core/controllers/subscribes_controller')

// 登录注册
router
  .group(() => {
    router.resource('subscribe', SubscribesController).apiOnly()
  })
  .prefix('core')
