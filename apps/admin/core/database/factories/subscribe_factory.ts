import Subscribe from '#core/models/subscribe'
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

export const SubscribeFactory = factory
  .define(Subscribe, async ({ faker }) => {
    return {
      endTime: monthDates[(monthIndex++ % monthDates.length)],
      description: faker.lorem.sentence(),
    }
  })
  .build()
