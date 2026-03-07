import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      name: faker.person.firstName(),
      // password: 'admin888',
      nickname: faker.person.fullName(),
      home: faker.internet.url(),
      mobile: faker.phone.number(),
      email: faker.internet.email(),
      address: faker.location.street(),
      sex: faker.datatype.boolean(),
      avatar: faker.image.personPortrait({ size: 256 }),
    }
  })
  .build()
