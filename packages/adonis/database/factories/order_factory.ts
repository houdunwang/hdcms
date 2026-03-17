import Order from '../models/order.js'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'

export const OrderFactory = factory
  .define(Order, async ({ faker }) => {
    const datetime = DateTime.fromJSDate(
      faker.date.between({
        from: DateTime.now().minus({ month: 12 }).toJSDate(),
        to: DateTime.now().toJSDate(),
      })
    )
    return {
      orderableType: 'subscribe',
      orderableId: 1,
      sn: faker.string.uuid(),
      subject: faker.lorem.sentence(),
      price: faker.number.int({ min: 300, max: 900 }).toFixed(2),
      payState: faker.datatype.boolean(),
      payType: faker.helpers.arrayElement(['alipay', 'wepay']),
      tradeNo: faker.string.uuid(),
      createdAt: datetime,
      updatedAt: datetime,
    }
  })
  .build()
