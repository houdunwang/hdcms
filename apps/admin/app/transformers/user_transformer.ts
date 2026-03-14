import type User from '#models/user'
import { type Authenticator } from '@adonisjs/auth'
import { type Authenticators } from '@adonisjs/auth/types'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  constructor(
    protected resource: User,
    protected auth?: Authenticator<Authenticators>
  ) {
    super(resource)
  }

  toObject() {
    const showPrivateField = this.resource.id === this.auth?.user?.id || this.auth?.user?.isAdmin
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
      mobile: showPrivateField ? this.resource.mobile : null,
      realName: showPrivateField ? this.resource.realName : null,
      address: showPrivateField ? this.resource.address : null,
      openid: showPrivateField ? this.resource.openid : null,
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
