import '#core/routes/index'
import router from '@adonisjs/core/services/router'
import { wechat } from '@hdcms/config'
import { UserController } from '@hdcms/adonis'
router.get('/test', [UserController, 'test'])
router.get('/', async ({ }) => {
  console.log(' wechat', wechat)
  return wechat
})

