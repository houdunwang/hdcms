import '#core/routes/index'

import router from '@adonisjs/core/services/router'
router.get('/', async ({ }) => {
	return 'welcome'
})
