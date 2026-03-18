import router from '@adonisjs/core/services/router'
import '#core/routes/index'
import { wechat } from '@hdcms/config/wechat'

router.get('/', async ({ }) => {
  console.log(' wechat', wechat)
  return wechat
})

