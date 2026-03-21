import { test } from '@japa/runner'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { UserFactory } from '#core/database/factories/user_factory'
import hash from '@adonisjs/core/services/hash'
import cache from '@adonisjs/cache/services/main'

test.group('Auth controller', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('login: should return 422 when account is missing', async ({ client }) => {
    const captchaKey = 'test-captcha-key-1'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/login').json({
      account: '',
      password: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('login: should return 422 when password is missing', async ({ client }) => {
    const captchaKey = 'test-captcha-key-2'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/login').json({
      account: 'admin',
      password: '',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('login: should return 422 when account length is less than 3', async ({ client }) => {
    const captchaKey = 'test-captcha-key-3'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/login').json({
      account: 'ab',
      password: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('login: should return 422 when password length is less than 5', async ({ client }) => {
    const captchaKey = 'test-captcha-key-4'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/login').json({
      account: 'admin',
      password: '1234',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('login: should return 422 when user does not exist', async ({ client }) => {
    const captchaKey = 'test-captcha-key-5'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/login').json({
      account: 'nonexistent',
      password: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
    response.assertBodyContains({ errors: [{ message: '帐号 不存在' }] })
  })

  test('login: should return 422 when password is incorrect', async ({ client }) => {
    const captchaKey = 'test-captcha-key-6'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const password = 'correctpassword'
    await UserFactory.merge({
      name: 'testuser6',
      password: await hash.make(password),
    }).create()

    const response = await client.post('/core/login').json({
      account: 'testuser6',
      password: 'wrongpassword',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
    response.assertBodyContains({ errors: [{ message: '密码错误', field: 'password' }] })
  })

  test('login: should return 200 and token when login successful', async ({ client, assert }) => {
    const captchaKey = 'test-captcha-key-7'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const password = 'admin888'
    const user = await UserFactory.merge({
      name: 'loginuser7',
      password: await hash.make(password),
    }).create()

    const response = await client.post('/core/login').json({
      account: 'loginuser7',
      password: password,
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(200)
    const body = response.body() as any
    assert.property(body.data, 'token')
    assert.property(body.data, 'user')
    assert.equal(body.data.user.id, user.id)
    assert.equal(body.data.user.name, user.name)
  })

  test('login: should return 200 when login with email', async ({ client, assert }) => {
    const captchaKey = 'test-captcha-key-8'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const password = 'admin888'
    const user = await UserFactory.merge({
      name: 'emailuser8',
      email: 'test8@example.com',
      password: await hash.make(password),
    }).create()

    const response = await client.post('/core/login').json({
      account: 'test8@example.com',
      password: password,
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(200)
    const body = response.body() as any
    assert.property(body.data, 'token')
    assert.equal(body.data.user.id, user.id)
  })

  test('login: should return 200 when login with mobile', async ({ client, assert }) => {
    const captchaKey = 'test-captcha-key-9'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const password = 'admin888'
    const user = await UserFactory.merge({
      name: 'mobileuser9',
      mobile: '13800138009',
      password: await hash.make(password),
    }).create()

    const response = await client.post('/core/login').json({
      account: '13800138009',
      password: password,
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(200)
    const body = response.body() as any
    assert.property(body.data, 'token')
    assert.equal(body.data.user.id, user.id)
  })

  test('logout: should return 401 when not authenticated', async ({ client }) => {
    const response = await client.post('/core/logout')
    response.assertStatus(401)
  })

  test('logout: should return 200 when logout successful', async ({ client }) => {
    const user = await UserFactory.create()
    const response = await client.post('/core/logout').loginAs(user)
    response.assertStatus(200)
  })

  test('register: should return 422 when name is missing', async ({ client }) => {
    const captchaKey = 'test-captcha-key-10'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/register').json({
      name: '',
      password: 'admin888',
      password_confirmation: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('register: should return 422 when password is missing', async ({ client }) => {
    const captchaKey = 'test-captcha-key-11'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/register').json({
      name: 'newuser',
      password: '',
      password_confirmation: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('register: should return 422 when name length is less than 3', async ({ client }) => {
    const captchaKey = 'test-captcha-key-12'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/register').json({
      name: 'ab',
      password: 'admin888',
      password_confirmation: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('register: should return 422 when name length is more than 20', async ({ client }) => {
    const captchaKey = 'test-captcha-key-13'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/register').json({
      name: 'a'.repeat(21),
      password: 'admin888',
      password_confirmation: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('register: should return 422 when password length is less than 5', async ({ client }) => {
    const captchaKey = 'test-captcha-key-14'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/register').json({
      name: 'newuser',
      password: '1234',
      password_confirmation: '1234',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('register: should return 422 when password does not match confirmation', async ({ client }) => {
    const captchaKey = 'test-captcha-key-15'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/register').json({
      name: 'newuser',
      password: 'admin888',
      password_confirmation: 'admin999',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('register: should return 422 when name already exists', async ({ client }) => {
    const captchaKey = 'test-captcha-key-16'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    await UserFactory.merge({ name: 'existinguser16' }).create()

    const response = await client.post('/core/register').json({
      name: 'existinguser16',
      password: 'admin888',
      password_confirmation: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(422)
  })

  test('register: should return 200 and token when register successful', async ({ client, assert }) => {
    const captchaKey = 'test-captcha-key-17'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    const response = await client.post('/core/register').json({
      name: 'newregistereduser17',
      password: 'admin888',
      password_confirmation: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)
    response.assertStatus(200)
    const body = response.body() as any
    assert.property(body.data, 'token')
    assert.property(body.data, 'user')
    assert.equal(body.data.user.name, 'newregistereduser17')
  })

  test('register: should create user in database when register successful', async ({ client, assert }) => {
    const captchaKey = 'test-captcha-key-18'
    await cache.set({ key: captchaKey, value: '1234', ttl: '5m' })

    await client.post('/core/register').json({
      name: 'dbuser18',
      password: 'admin888',
      password_confirmation: 'admin888',
      captcha: '1234',
      captcha_key: captchaKey,
    } as any)

    const user = await User.findBy('name', 'dbuser18')
    assert.exists(user)
    assert.equal(user!.name, 'dbuser18')
  })
})
