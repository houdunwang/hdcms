import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

interface AdminDashboardResponse {
  totalUsersCount: number
  todayUsersCount: number
  todaySales: number
  orderMonths: { month: string; count: number; amount: number }[]
  monthVisitorsCount: { day: string; count: number }[]
  weekSales: number
  subscribersByMonth: { month: string; count: number }[]
  validSubscribers: number
}

test.group('AdminController index', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('未登录用户访问应返回 401', async ({ client }) => {
    const response = await client.get('/core/admin')

    response.assertStatus(401)
  })

  test('非管理员用户访问应返回 403', async ({ client }) => {
    await User.firstOrCreate(
      { id: 1 },
      {
        email: 'admin@test.com',
        password: 'admin123',
        name: '管理员',
      }
    )

    const user = await User.create({
      email: 'user@test.com',
      password: 'password123',
      name: '普通用户',
    })

    const response = await client.get('/core/admin').loginAs(user)

    response.assertStatus(403)
  })

  test('管理员用户访问应返回统计数据', async ({ client, assert }) => {
    const admin = await User.firstOrCreate(
      { id: 1 },
      {
        email: 'admin@test.com',
        password: 'admin123',
        name: '管理员',
      }
    )

    const response = await client.get('/core/admin').loginAs(admin)

    response.assertStatus(200)

    const body = response.body() as { data: AdminDashboardResponse }
    const data = body.data

    assert.properties(data, [
      'totalUsersCount',
      'todayUsersCount',
      'todaySales',
      'orderMonths',
      'monthVisitorsCount',
      'weekSales',
      'subscribersByMonth',
      'validSubscribers',
    ])

    assert.isArray(data.orderMonths)
    assert.isArray(data.monthVisitorsCount)
    assert.isArray(data.subscribersByMonth)
    assert.typeOf(data.totalUsersCount, 'number')
    assert.typeOf(data.todayUsersCount, 'number')
    assert.typeOf(data.todaySales, 'number')
    assert.typeOf(data.weekSales, 'number')
    assert.typeOf(data.validSubscribers, 'number')
  })
})
