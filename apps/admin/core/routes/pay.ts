import { middleware } from "#start/kernel";
import router from "@adonisjs/core/services/router";
const PaysController = () => import("#core/controllers/pays_controller")

router.group(() => {
	router.post('/', [PaysController, 'handle'],).use([middleware.auth()])
	router.post('/notify', [PaysController, 'notify']).as('pay.notify')
}).prefix('/core/pay')