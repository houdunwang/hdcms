import env from '#start/env'
import app from '@adonisjs/core/services/app'
import { defineConfig, syncDestination, targets } from '@adonisjs/core/logger'

const loggerConfig = defineConfig({
  default: 'app',
  /**
   * The loggers object can be used to define multiple loggers.
   * By default, we configure only one logger (named "app").
   */
  loggers: {
    app: {
      enabled: true,
      name: env.get('APP_NAME'),
      level: env.get('LOG_LEVEL'),
      desination: !app.inProduction ? await syncDestination() : undefined,
      transport: {
        targets: targets()
          .pushIf(app.inProduction, {
            target: 'pino-roll',
            level: 'info',
            options: {
              file: app.makePath('storage/logs/app.log'),
              frequency: 'daily',
              mkdir: true,
            },
          })
          .pushIf(!app.inProduction, targets.file({ destination: 1 }))
          .toArray(),
      },
    },
  },
})

export default loggerConfig

/**
 * Inferring types for the list of loggers you have configured
 * in your application.
 */
declare module '@adonisjs/core/types' {
  export interface LoggersList extends InferLoggers<typeof loggerConfig> {}
}
