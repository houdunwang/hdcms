import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const AdminController = () => import('#core/controllers/admin_controller')
router.group(() => {
	router.get('/admin', [AdminController])
	// .use([middleware.admin()])
}).prefix('/core')