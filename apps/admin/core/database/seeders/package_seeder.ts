import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PackageFactory } from '#core/database/factories/package_factory'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']
  async run() {
    await PackageFactory.createMany(3)
  }
}
