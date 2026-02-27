import type User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  constructor(protected resource: User, protected user: User) {
    super(resource)
  }
  toObject() {
    const extendFields = this.resource.id != this.user.id ? ['mobile', 'email'] as const : [];
    return this.omit(this.resource, [
      'password',
      'openid',
      ...extendFields
    ])
  }

  async forDetailedView({ request }: HttpContext) {
    console.log('request', request)
    return {
      ...this.toObject(),
      can: {
        view: true,
      }
    }
  }
}
