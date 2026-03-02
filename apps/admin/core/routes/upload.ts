import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const UploadsController = () => import("#core/controllers/uploads_controller")

router.group(() => {
	router.post('/file', [UploadsController, 'file']).use([middleware.auth()])
	router.post('/imageSingle', [UploadsController, 'imageSingle']).use([middleware.auth()])
}).prefix('/core/upload')