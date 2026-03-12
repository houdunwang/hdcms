import factory from '@adonisjs/lucid/factories'
import User from '#models/user'
import { SubscribeFactory } from './subscribe_factory.ts'
import { OrderFactory } from './order_factory.ts'

export const UserFactory = factory.define(User, async ({ faker }) => {
  return {
    name: `${faker.person.firstName()}_${faker.string.uuid().slice(0, 8)}`,
    nickname: faker.person.fullName(),
    home: faker.internet.url(),
    mobile: faker.phone.number(),
    email: faker.internet.email(),
    address: faker.location.street(),
    sex: faker.datatype.boolean(),
    avatar: faker.image.personPortrait({ size: 256 }),
  }
})
  .relation('subscribes', () => SubscribeFactory)
  .relation('orders', () => OrderFactory)
  .build()
