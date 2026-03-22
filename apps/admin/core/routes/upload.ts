import { middleware } from '#start/kernel'
import { apiLimiter } from '#start/limiter'
import router from '@adonisjs/core/services/router'
const UploadsController = () => import('#core/controllers/uploads_controller')

router.group(() => {
  router.post('/file', [UploadsController, 'file']).use([middleware.auth(), apiLimiter('upload-file')])
  router.post('/image', [UploadsController, 'image']).use([middleware.auth(), apiLimiter('upload-image')])
}).prefix('/core/upload')
