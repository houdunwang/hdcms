import { UserFactory } from '#database/factories/user_factory'
import User from '#models/user'
import env from '#start/env'
import hash from '@adonisjs/core/services/hash'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await UserFactory.createMany(10)
    const user = await User.findOrFail(1)
    user.name = 'admin'
    user.email = env.get('TEST_USER_EMAIL') ?? null
    user.mobile = env.get('TEST_USER_MOBILE') ?? null
    user.password = await hash.make('admin888')
    await user.save()
  }
}