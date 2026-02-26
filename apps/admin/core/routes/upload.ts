import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const UploadsController = () => import("#core/controllers/uploads_controller")

router.group(() => {
	router.post('/', [UploadsController]).use([middleware.auth()])
}).prefix('/core/upload')