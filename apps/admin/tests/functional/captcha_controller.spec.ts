import cache from '@adonisjs/cache/services/main'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('CaptchaController - 图形验证码', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('获取验证码 - 应成功返回验证码数据', async ({ client, assert }) => {
    const response = await client.get('/core/captcha')

    response.assertStatus(200)

    const body = response.body() as { data: { key: string; svg: string } }

    assert.exists(body.data)
    assert.exists(body.data.key)
    assert.exists(body.data.svg)
    assert.include(body.data.key, 'captcha-')
    assert.include(body.data.svg, '<svg')
  })

  test('获取验证码 - 验证码应存储在缓存中', async ({ client, assert }) => {
    const response = await client.get('/core/captcha')

    response.assertStatus(200)

    const body = response.body() as { data: { key: string; svg: string } }
    const captchaKey = body.data.key

    const cachedValue = await cache.get({ key: captchaKey })
    assert.exists(cachedValue)
    assert.typeOf(cachedValue, 'string')
  })

  test('获取验证码 - 多次请求应返回不同的验证码', async ({ client, assert }) => {
    const response1 = await client.get('/core/captcha')
    const response2 = await client.get('/core/captcha')

    response1.assertStatus(200)
    response2.assertStatus(200)

    const body1 = response1.body() as { data: { key: string; svg: string } }
    const body2 = response2.body() as { data: { key: string; svg: string } }

    assert.notEqual(body1.data.key, body2.data.key)
    assert.notEqual(body1.data.svg, body2.data.svg)
  })
})
