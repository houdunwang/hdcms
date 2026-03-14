import Subscribe from '#core/models/subscribe'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'



export const SubscribeFactory = factory
  .define(Subscribe, async ({ faker }) => {
    const createAt = DateTime.fromJSDate(
      faker.date.between({
        from: DateTime.now().minus({ month: 10 }).toJSDate(),
        to: DateTime.now().toJSDate(),
      })
    )
    return {
      endTime: DateTime.fromJSDate(
        faker.date.between({
          from: DateTime.now().minus({ month: 10 }).toJSDate(),
          to: DateTime.now().plus({ months: 20 }).toJSDate(),
        })
      ),
      createdAt: createAt,
      updatedAt: createAt,
      description: faker.lorem.sentence(),
    }
  })
  .build()
