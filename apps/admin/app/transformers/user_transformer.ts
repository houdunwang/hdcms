import type User from '#models/user'
import { Authenticator } from '@adonisjs/auth'
import { Authenticators } from '@adonisjs/auth/types'
import { HttpContext } from '@adonisjs/core/http'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  constructor(protected resource: User, protected auth?: Authenticator<Authenticators>) {
    super(resource)
  }

  toObject() {
    const isSelf = this.resource.id === this.auth?.user?.id
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'nickname',
        'weibo',
        'wechat',
        'home',
        'email',
        'address',
        'sex',
        'avatar',
        'home',
        'github',
        'qq',
        'createdAt',
        'updatedAt',
      ]),
      'mobile': isSelf ? this.resource.mobile : null,
      'realName': isSelf ? this.resource.realName : null,
      'address': isSelf ? this.resource.address : null,
      'openid': isSelf ? this.resource.openid : null,
    }
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
