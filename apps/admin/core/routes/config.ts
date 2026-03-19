import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const ConfigsController = () => import('#core/controllers/configs_controller')
router.group(() => {
	router.get('/configs/all', [ConfigsController, 'all']).middleware([middleware.admin()])
	router.get('/configs/common', [ConfigsController, 'common'])
	router.post('/configs/store', [ConfigsController, 'store']).middleware([middleware.admin()])
}).prefix('/core')