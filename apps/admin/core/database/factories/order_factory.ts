import Order from '#core/models/order'
import factory from '@adonisjs/lucid/factories'
import { monthDates } from './subscribe_factory.ts'
let monthIndex = 0

export const OrderFactory = factory
  .define(Order, async ({ faker }) => {
    return {
      'orderableType': 'subscribe',
      'orderableId': 1,
      'sn': faker.string.uuid(),
      'subject': faker.lorem.sentence(),
      'price': faker.number.int({ min: 50, max: 200 }),
      'payState': faker.datatype.boolean(),
      'payType': faker.helpers.arrayElement(['alipay', 'wepay']),
      'tradeNo': faker.string.uuid(),
      'createdAt': monthDates[(monthIndex++ % monthDates.length)],
    }
  })
  .build()
