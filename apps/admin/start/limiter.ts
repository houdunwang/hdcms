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

// 图形验证码频率限制
export const throttleCaptcha = limiter.define('api', () => {
  return limiterDefined()
})

// 发送验证码频率限制
export const throttleSendCode = limiter.define('api', () => {
  return limiterDefined(10)
})

// 全局请求频率限制
export const throttle = limiter.define('global', () => {
  return limiter
    .allowRequests(20)
    .every('1 minute')
    .limitExceeded((error) => {
      error
        .setStatus(429)
        .setMessage(`请求频率过快，请${error.response.availableIn}秒后再试`)
    })
})

// 定义limiter
function limiterDefined(requestNumber = 20, message = '请求频率过快', minute = 1) {
  return limiter
    .allowRequests(requestNumber)
    .every(`${minute} minute`)
    .limitExceeded((error) => {
      return error
        .setStatus(429)
        .setMessage(`${message}，请${error.response.availableIn}秒后再试`)
    })
}