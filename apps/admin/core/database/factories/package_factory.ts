import factory from '@adonisjs/lucid/factories'
import Package from '#core/models/package'

export const PackageFactory = factory
  .define(Package, async ({ faker }) => {
    return {
      title: faker.word.words(2),
      ad: faker.lorem.sentence(),
      months: faker.number.int({ min: 1, max: 12 }),
      price: faker.number.float({ min: 0.01, max: 0.05, fractionDigits: 2 }).toFixed(2),
      originalPrice: faker.number.float({ min: 100, max: 1000, fractionDigits: 2 }).toFixed(2),
      icon: faker.image.url(),
      feature: JSON.stringify(faker.lorem.lines({ min: 2, max: 6 }).split('\n')),
    }
  })
  .build()
