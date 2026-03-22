---
name: "adonis-api-test"
description: "Generates AdonisJS controller API tests in Chinese. Invoke when user wants to create, write, or generate API tests for controllers."
---

# AdonisJS API 测试生成器 (AdonisJS API Test Generator)

当用户需要为控制器编写 API 测试时，使用此技能生成标准的 Japa 测试代码。

## 核心规则与约定
1. **中文强制**：测试用例的 `test.group` 名称、`test` 描述、代码注释等**必须使用中文**。
2. **目录规范**：
   - 控制器目录：`controllers` 或 `core/controllers`。
   - 路由文件：`routes` 目录或 `routes.ts` 文件。
3. **测试规范 (基于 Japa API Client)**：
   - 必须使用 `client.visit('route_name')` 访问路由。
   - 必须在 `group.each.setup()` 中调用 `testUtils.db().truncate()` 来保证测试状态隔离。
   - 使用 `.json()` 方法传递请求体。
   - 必须包含常见的断言验证（如 `response.assertStatus()` 和 `response.assertBodyContains()`）。

## 测试代码模板

生成测试时，请参考以下模板结构：

```typescript
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
// 根据实际情况引入所需模型，例如：import User from '#models/user'

test.group('控制器功能 - API 测试', (group) => {
  // 确保测试间状态隔离：每次测试后清空数据表
  group.each.setup(() => {
    return testUtils.db().truncate()
  })

  test('验证未提供必填字段时应返回 422 验证错误', async ({ client }) => {
    // 访问路由名称对应的接口
    const response = await client.visit('route.name')

    // 断言验证失败的状态码（通常为 422）
    response.assertStatus(422)
    response.assertBodyContains({
      errors: [
        // 在此补充期望的错误字段
      ],
    })
  })

  test('验证使用有效数据可成功完成操作并返回 200', async ({ client, assert }) => {
    // 使用 .json() 方法发送数据
    const response = await client.visit('route.name').json({
      field: 'value',
    })

    // 断言成功状态码
    response.assertStatus(200)
    response.assertBodyContains({
      data: {
        field: 'value',
      },
    })

    // （可选）直接查询数据库验证持久化数据
    // const record = await Model.findOrFail(response.body().data.id)
    // assert.equal(record.field, 'value')
  })
})
```

## 执行步骤
1. 分析用户提供的控制器代码或接口需求。
2. 按照上述模板和规则，直接生成对应的 `.spec.ts` 测试文件内容。
3. 如果用户没有提供路由名称，请基于 AdonisJS 的约定推断或提醒用户。