import router from '@adonisjs/core/services/router'
const AuthorizeController = () => import('#core/controllers/authorize_controller')
router.post('/core/authorize', [AuthorizeController])

