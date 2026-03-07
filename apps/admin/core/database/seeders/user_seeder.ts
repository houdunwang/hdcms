import User from '#models/user'
import env from '#start/env'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { UserFactory } from '../factories/user_factory.ts'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await UserFactory.createMany(10)
    const user = await User.findOrFail(1)
    user.name = 'admin'
    user.email = env.get('TEST_USER_EMAIL') ?? null
    user.mobile = env.get('TEST_USER_MOBILE') ?? null
    user.password = 'admin888'
    await user.save()
  }
}
