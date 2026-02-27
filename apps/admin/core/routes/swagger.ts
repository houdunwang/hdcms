import swagger from '#config/swagger'
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'

// swagger
router
  .group(() => {
    router.get('/swagger/docs', async () => AutoSwagger.default.ui('/core/swagger/yaml', swagger))
    router.get('/swagger/yaml', async () => AutoSwagger.default.docs(router.toJSON(), swagger))
  })
  .prefix('core')
  .use([middleware.development()])
