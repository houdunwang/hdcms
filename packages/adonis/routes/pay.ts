import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const PaysController = () => import('../controllers/pays_controller.js')

router
  .group(() => {
    router.post('/wepay', [PaysController, 'wepay']).use([middleware.auth()])
    router.post('/wepay/check', [PaysController, 'wepayCheck']).use([middleware.auth()])
    router.post('/notify', [PaysController, 'notify']).as('pay.notify')
  })
  .prefix('/core/pay')
