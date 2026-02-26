/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'
import env from './env.ts'

export const throttleSendCode = limiter.define('api', () => {
  return limiter
    .allowRequests(env.get('NODE_ENV') === 'development' ? 10 : 1)
    .every('1 minute')
    .limitExceeded((error) => {
      return error
        .setStatus(429)
        .setMessage(`发送验证码次数过快，请${error.response.availableIn}秒后再试`)
    })
})

// 全局请求频率限制
export const throttle = limiter.define('global', () => {
  return limiter
    .allowRequests(env.get('NODE_ENV') === 'development' ? 1 : 10)
    .every('1 minute')
    .limitExceeded((error) => {
      error
        .setStatus(429)
        .setMessage(`请求频率过快，请${error.response.availableIn}秒后再试`)
    })
})
