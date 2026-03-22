import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('UploadsController - 文件上传', (group) => {
  group.each.setup(() => testUtils.db().truncate())

  test('上传文件 - 未登录用户应返回 401', async ({ client }) => {
    const response = await client.post('/core/upload/file')

    response.assertStatus(401)
  })

  test('上传图片 - 未登录用户应返回 401', async ({ client }) => {
    const response = await client.post('/core/upload/image')

    response.assertStatus(401)
  })

  test('上传文件 - 已登录用户未提供文件应返回错误', async ({ client }) => {
    const user = await User.create({
      name: 'uploaduser',
      password: 'password123',
      email: 'upload@example.com',
    })

    const response = await client.post('/core/upload/file').loginAs(user)

    response.assertStatus(400)
    response.assertBodyContains({
      errors: [{ message: '文件不能为空' }],
    })
  })

  test('上传图片 - 已登录用户未提供文件应返回验证错误', async ({ client }) => {
    const user = await User.create({
      name: 'imageuser',
      password: 'password123',
      email: 'image@example.com',
    })

    const response = await client.post('/core/upload/image').loginAs(user)

    response.assertStatus(422)
  })
})
