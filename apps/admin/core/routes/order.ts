import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const OrdersController = () => import('#core/controllers/orders_controller')

router.group(() => {
  router.get('/', [OrdersController, 'index']).use([middleware.admin()])
}).prefix('/core/order')
