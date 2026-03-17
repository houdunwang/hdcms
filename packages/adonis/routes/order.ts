import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const OrdersController = () => import('../controllers/orders_controller.js')

router
  .group(() => {
    router.get('/index', [OrdersController, 'index']).use([middleware.admin()])
  })
  .prefix('/core/order')
