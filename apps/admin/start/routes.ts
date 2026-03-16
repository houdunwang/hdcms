import '#core/routes/index'
import router from '@adonisjs/core/services/router'
import { wechat } from '@hdcms/config'

router.get('/', async ({ }) => {
  console.log(' wechat', wechat)
  return wechat
})
