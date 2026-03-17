import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PackageFactory } from '../factories/package_factory.ts.js'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']
  async run() {
    await PackageFactory.createMany(3)
  }
}
