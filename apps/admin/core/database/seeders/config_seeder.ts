import Config from '#core/models/config'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
const initConfigs = [
  { name: 'site_close', value: '0', system: false, },
  { name: 'site_close_description', value: '站点关闭后，用户无法访问站点', system: false },
]
export default class extends BaseSeeder {
  static environment = ['development', 'testing']
  async run() {
    await Config.fetchOrCreateMany('name', initConfigs)
  }
}