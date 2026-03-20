/**
 * 作者: 向军大叔
 * 邮箱: 2300071698@qq.com
 * 直播: 抖音、B站 搜索 后盾云
 */
import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'

const AdminController = () => import('../controllers/admin_controller.ts')

router.group(() => {
  router.get('/admin', [AdminController, 'index']).use([middleware.admin()])
}).prefix('/core')
