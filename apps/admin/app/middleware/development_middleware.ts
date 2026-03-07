import env from '#start/env'
import { Exception } from '@adonisjs/core/exceptions'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class DevelopmentMiddleware {
  async handle(_ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    if (env.get('NODE_ENV') !== 'development') {
      throw new Exception('仅在开发环境下访问', {
        code: 'E_UNAUTHORIZED_ACCESS',
        status: 403,
      })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
