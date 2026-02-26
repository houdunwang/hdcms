import ace from '@adonisjs/core/services/ace'
import logger from '@adonisjs/core/services/logger'
import cron from 'node-cron'

import app from '@adonisjs/core/services/app'

if (app.inProduction || app.getEnvironment() === 'web') {
	cron.schedule('*/10 * * * *', async () => {
		logger.info('Running scheduled task: cache:prune')
		try {
			await ace.exec('cache:prune', [])
			logger.info('Completed scheduled task: cache:prune')
		} catch (error) {
			logger.error({ err: error }, 'Failed to run scheduled task: cache:prune')
		}
	})
}
