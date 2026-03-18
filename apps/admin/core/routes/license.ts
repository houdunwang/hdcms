import router from '@adonisjs/core/services/router'
const LicensesController = () => import('#core/controllers/licenses_controller')
router.post('/core/license/check', [LicensesController])
