import Order from '#core/models/order'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'
export const monthDates = (() => {
  const start = DateTime.fromISO('2025-01-01').startOf('month')
  const now = DateTime.now()
  const dates: DateTime[] = []
  let cursor = start
  while (cursor <= now) {
    dates.push(cursor)
    cursor = cursor.plus({ months: 1 })
  }
  return dates
})()

let monthIndex = 0

export const OrderFactory = factory
  .define(Order, async ({ faker }) => {
    return {
      'orderableType': 'subscribe',
      'orderableId': 1,
      'sn': faker.string.uuid(),
      'subject': faker.lorem.sentence(),
      'price': faker.number.int({ min: 50, max: 200 }).toFixed(2),
      'payState': faker.datatype.boolean(),
      'payType': faker.helpers.arrayElement(['alipay', 'wepay']),
      'tradeNo': faker.string.uuid(),
      'createdAt': monthDates[(monthIndex++ % monthDates.length)],
    }
  })
  .build()
