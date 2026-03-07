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

/**
 * 定义API请求频率限制中间件
 * @param requestNumber 每个时间单位允许的最大请求次数
 * @param few 时间单位的数量
 * @param unit 时间单位，默认分钟
 * @param message 自定义错误消息
 * @returns
 */
export function apiLimiter(
  key: string,
  requestNumber = 20,
  few = 1,
  unit: 'minute' | 'second' | 'hour' = 'minute',
  message = '请求频率过快, '
) {
  return limiter.define(key, () => {
    return limiterDefined(requestNumber, few, unit, message)
  })
}

/**
 * 定义limiter中间件
 * @param requestNumber 每个时间单位允许的最大请求次数
 * @param few 时间单位的数量
 * @param unit 时间单位，默认分钟
 * @param message 自定义错误消息
 * @returns
 */
function limiterDefined(
  requestNumber = 20,
  few = 1,
  unit: 'minute' | 'second' | 'hour' = 'minute',
  message = '请求频率过快, '
) {
  return limiter
    .allowRequests(requestNumber)
    .every(`${few} ${unit}`)
    .limitExceeded((error) => {
      const availableIn =
        error.response.availableIn > 3600
          ? `${Math.ceil(error.response.availableIn / 3600)}小时`
          : error.response.availableIn > 60
            ? `${Math.ceil(error.response.availableIn / 60)}分钟`
            : `${Math.ceil(error.response.availableIn)}秒`
      return error.setStatus(429).setMessage(`${message} 请${availableIn}后再试`)
    })
}

// 全局请求频率限制
export const throttle = limiter.define('global', () => {
  return limiter
    .allowRequests(30)
    .every('1 minute')
    .limitExceeded((error) => {
      error.setStatus(429).setMessage(`请求频率过快，请${error.response.availableIn}秒后再试`)
    })
})
