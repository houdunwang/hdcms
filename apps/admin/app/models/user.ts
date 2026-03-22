import Order from '#core/models/order'
import Subscribe from '#core/models/subscribe'
import { UserSchema } from '#database/schema'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})
export default class User extends compose(UserSchema, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  @column({ serializeAs: null })
  declare name: string

  @column({ serializeAs: null })
  declare address: string

  @column({ serializeAs: null })
  declare realName: string

  @column({ serializeAs: null })
  declare password: string

  @column({ serializeAs: null })
  declare mobile: string | null

  @column({ serializeAs: null })
  declare openid: string

  @column({ serializeAs: null })
  declare unionid: string

  @hasMany(() => Subscribe)
  declare subscribes: HasMany<typeof Subscribe>

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  get isAdmin() {
    return this.id === 1
  }
}
