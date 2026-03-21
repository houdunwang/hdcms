import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#core/database/factories/user_factory'

test.group('Admin controller', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('should return 401 when not authenticated', async ({ client }) => {
    const response = await client.get('/core/admin')
    response.assertStatus(401)
  })

  test('should return 403 when authenticated as normal user', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.get('/core/admin').loginAs(user)
    response.assertStatus(403)
  })

  test('should return 200 and stats when authenticated as admin', async ({ client, assert }) => {
    let admin = await User.find(1)
    if (!admin) {
      admin = await UserFactory.merge({ id: 1 }).create()
    }
    const response = await client.get('/core/admin').loginAs(admin)
    response.assertStatus(200)

    const body = response.body() as any
    assert.property(body.data, 'totalUsersCount')
    assert.property(body.data, 'todayUsersCount')
    assert.property(body.data, 'todaySales')
    assert.property(body.data, 'orderMonths')
    assert.property(body.data, 'monthVisitorsCount')
    assert.property(body.data, 'weekSales')
    assert.property(body.data, 'subscribersByMonth')
    assert.property(body.data, 'validSubscribers')
  })
})