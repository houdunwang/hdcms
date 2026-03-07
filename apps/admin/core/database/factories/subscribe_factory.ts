import Subscribe from '#core/models/subscribe'
import factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'

export const SubscribeFactory = factory
  .define(Subscribe, async ({ faker }) => {
    return {
      endTime: DateTime.fromJSDate(faker.date.future()),
    }
  })
  .build()
