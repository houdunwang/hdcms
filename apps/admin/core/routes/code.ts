import { apiLimiter } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const CodesController = () => import('#core/controllers/codes_controller')

// 发送验证码
router.post('/core/code/email', [CodesController, 'email']).use([apiLimiter(10)])
router.post('/core/code/mobile', [CodesController, 'mobile']).use([apiLimiter(10)])

