import router from '@adonisjs/core/services/router'

const CodesController = () => import('#core/controllers/codes_controller')

// 发送验证码
router.post('/core/code/email', [CodesController, 'email'])
router.post('/core/code/mobile', [CodesController, 'mobile'])

