import Order from '#core/models/order'
import Subscribe from '#core/models/subscribe'
import { UserSchema } from '#database/schema'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})
export default class User extends compose(UserSchema, AuthFinder) {
  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken

  get isAdmin() {
    return this.id === 1
  }

  @hasMany(() => Subscribe)
  declare subscribes: HasMany<typeof Subscribe>

  @hasMany(() => Order)
  declare orders: HasMany<typeof Order>

  // get initials() {
  //   const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
  //   if (first && last) {
  //     return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
  //   }
  //   return `${first.slice(0, 2)}`.toUpperCase()
  // }
}
