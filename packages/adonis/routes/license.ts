import router from '@adonisjs/core/services/router'
const LicensesController = () => import('../controllers/licenses_controller.js')
router.post('/core/license/check', [LicensesController])
