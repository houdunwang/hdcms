import { throttleSendCode } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const CodesController = () => import('#core/controllers/codes_controller')

// 发送验证码
router.post('/core/code/send/:type', [CodesController, 'send'])

