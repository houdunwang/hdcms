import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { PackageFactory } from '../factories/package_factory.ts'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await PackageFactory.createMany(3)
  }
}