import User from '#models/user'
import cache from '@adonisjs/cache/services/main'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

interface RegisterPayload {
  name: string
  password: string
  password_confirmation: string
  captcha: string
  captcha_key: string
}

test.group('AuthController - 登录注册', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('注册 - 缺少必填字段应返回 422 验证错误', async ({ client }) => {
    const response = await client.post('/core/register').json({} as unknown as RegisterPayload)

    response.assertStatus(422)
    response.assertBodyContains({
      errors: [],
    })
  })

  test('注册 - 密码确认不一致应返回 422 验证错误', async ({ client }) => {
    const captchaKey = 'test-captcha-key-register-1'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const payload: RegisterPayload = {
      name: 'testuser',
      password: 'password123',
      password_confirmation: 'password456',
      captcha: '1234',
      captcha_key: captchaKey,
    }

    const response = await client.post('/core/register').json(payload)

    response.assertStatus(422)
  })

  test('注册 - 验证码错误应返回 422 验证错误', async ({ client }) => {
    const captchaKey = 'test-captcha-key-register-2'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const payload: RegisterPayload = {
      name: 'testuser',
      password: 'password123',
      password_confirmation: 'password123',
      captcha: 'wrong-captcha',
      captcha_key: captchaKey,
    }

    const response = await client.post('/core/register').json(payload)

    response.assertStatus(422)
  })

  test('注册 - 使用有效数据应成功注册并返回 200', async ({ client, assert }) => {
    const captchaKey = 'test-captcha-key-register-3'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const payload: RegisterPayload = {
      name: 'testuser',
      password: 'password123',
      password_confirmation: 'password123',
      captcha: '1234',
      captcha_key: captchaKey,
    }

    const response = await client.post('/core/register').json(payload)

    response.assertStatus(200)

    const body = response.body() as { data: { user: { id: number; name: string }; token: string } }
    assert.exists(body.data.user)
    assert.exists(body.data.token)
    assert.equal(body.data.user.name, 'testuser')

    const user = await User.find(body.data.user.id)
    assert.isDefined(user)
    assert.equal(user!.name, 'testuser')
  })

  test('注册 - 用户名已存在应返回 422 验证错误', async ({ client }) => {
    await User.create({
      name: 'existinguser',
      password: 'password123',
      email: 'existing@test.com',
    })

    const captchaKey = 'test-captcha-key-register-4'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const payload: RegisterPayload = {
      name: 'existinguser',
      password: 'password123',
      password_confirmation: 'password123',
      captcha: '1234',
      captcha_key: captchaKey,
    }

    const response = await client.post('/core/register').json(payload)

    response.assertStatus(422)
  })
})

test.group('AuthController - 退出登录', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('退出登录 - 未登录用户应返回 401', async ({ client }) => {
    const response = await client.post('/core/logout')

    response.assertStatus(401)
  })

  test('退出登录 - 已登录用户应成功退出并返回 200', async ({ client, assert }) => {
    const user = await User.create({
      name: 'logoutuser',
      password: 'password123',
      email: 'logout@test.com',
    })

    const response = await client.post('/core/logout').loginAs(user)

    response.assertStatus(200)

    const tokens = await User.accessTokens.all(user)
    assert.equal(tokens.length, 0)
  })
})
