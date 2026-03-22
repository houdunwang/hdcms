import { Ignitor } from '@adonisjs/core/env'
import app from '@adonisjs/core/services/app'

async function run() {
  const ignitor = new Ignitor(new URL('./', import.meta.url), {
    importer: (filePath) => import(filePath),
  })
  const app = ignitor.createApp('console')
  await app.init()
  await app.boot()
  const db = await app.container.make('lucid.db')
  const query = db.query().from('orders').whereLike('trade_no', '%fffdsf%')
  console.log(query.toSQL())
  process.exit(0)
}
run()
