import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  constructor(protected resource: User, protected user?: User) {
    super(resource)
  }
  toObject() {
    return this.pick(this.resource, [
      'id',
      'name',
      'nickname',
      'home',
      'mobile',
      'email',
      'address',
      'sex',
      'avatar',
      'home',
      'github',
      'qq',
      'createdAt',
      'updatedAt',
    ])
  }

  // async forDetailedView({ request }: HttpContext) {
  //   console.log('request', request)
  //   return {
  //     ...this.toObject(),
  //     can: {
  //       view: true,
  //     }
  //   }
  // }
}
