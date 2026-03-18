import env from '#start/env'
import { defineConfig, stores } from '@adonisjs/limiter'

const limiterConfig = defineConfig({
  default: env.get('LIMITER_STORE'),
  stores: {
    
    
    /**
     * Database store to save rate limiting data inside a
     * MYSQL or PostgreSQL database.
     */
    database: stores.database({
      tableName: 'rate_limits'
    }),
    
    /**
     * Memory store could be used during
     * testing
     */
    memory: stores.memory({})
  },
})

export default limiterConfig

declare module '@adonisjs/limiter/types' {
  export interface LimitersList extends InferLimiters<typeof limiterConfig> {}
}