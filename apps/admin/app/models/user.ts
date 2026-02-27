import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

const BaseUser = app.getEnvironment() === 'web' ? compose(UserSchema, withAuthFinder(hash)) : UserSchema

export default class User extends BaseUser {
  static get accessTokens() {
    return DbAccessTokensProvider.forModel(User)
  }
  declare currentAccessToken?: AccessToken

  // get initials() {
  //   const [first, last] = this.fullName ? this.fullName.split(' ') : this.email.split('@')
  //   if (first && last) {
  //     return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
  //   }
  //   return `${first.slice(0, 2)}`.toUpperCase()
  // }
}
