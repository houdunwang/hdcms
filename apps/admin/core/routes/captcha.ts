import { apiLimiter } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const CaptchaController = () => import('#core/controllers/captcha_controller')

// 图形验证码
router.get('/core/captcha', [CaptchaController]).use([apiLimiter(30, 1)])

