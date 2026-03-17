import router from '@adonisjs/core/services/router'
import '@hdcms/adonis/routes/index.ts'
import { wechat } from '@hdcms/config/wechat'
router.get('/', async ({ }) => {
  console.log(' wechat', wechat)
  return wechat
})

