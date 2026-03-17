import { apiLimiter } from '#start/limiter'
import router from '@adonisjs/core/services/router'

const CaptchaController = () => import('../controllers/captcha_controller.js')

// 图形验证码
router.get('/core/captcha', [CaptchaController]).use([apiLimiter('captcha', 30, 1)])
