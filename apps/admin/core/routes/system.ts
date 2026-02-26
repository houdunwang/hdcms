import swagger from '#config/swagger'
import { middleware } from '#start/kernel'
import { throttle, throttleSendCode } from '#start/limiter'
import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'

const CaptchaController = () => import('#core/controllers/captcha_controller')
const SystemController = () => import('#core/controllers/systems_controller')
const CodesController = () => import('#core/controllers/codes_controller')

router
  .group(() => {
    // 图形验证码
    router.get('/captcha', [CaptchaController]).use([throttle])
    // 重启应用
    router.post('/restart', [SystemController, 'restart']).use([middleware.admin()])
    // 发送验证码
    router.post('/sendCode', [CodesController, 'send']).use([throttleSendCode])
  })
  .prefix('core')

// swagger
router
  .group(() => {
    router.get('/swagger/docs', async () => AutoSwagger.default.ui('/core/swagger/yaml', swagger))
    router.get('/swagger/yaml', async () => AutoSwagger.default.docs(router.toJSON(), swagger))
  })
  .prefix('core')
  .use([middleware.development()])
