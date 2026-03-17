import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const UploadsController = () => import('../controllers/uploads_controller.js')

router
  .group(() => {
    router.post('/file', [UploadsController, 'file']).use([middleware.auth()])
    router.post('/imageSingle', [UploadsController, 'imageSingle']).use([middleware.auth()])
  })
  .prefix('/core/upload')
