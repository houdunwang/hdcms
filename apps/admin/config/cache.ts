import env from '#start/env'
import { defineConfig, store, drivers } from '@adonisjs/cache'

const cacheConfig = defineConfig({
  default: 'default',

  stores: {
    memoryOnly: store().useL1Layer(drivers.memory()),

    default: store()
      .useL1Layer(drivers.memory())

      .useL2Layer(drivers.database({
        connectionName: 'mysql',
        autoCreateTable: false,
        tableName: 'cache',
      }))

  }
})

export default cacheConfig

declare module '@adonisjs/cache/types' {
  interface CacheStores extends InferStores<typeof cacheConfig> { }
}