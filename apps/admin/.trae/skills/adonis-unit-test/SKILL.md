---
name: "adonis-unit-test"
description: "Generates AdonisJS unit tests in Chinese, especially for Services like upload_service.ts. Invoke when user wants to create unit tests for services or logic classes."
---

# AdonisJS 单元测试生成器 (AdonisJS Unit Test Generator)

当用户需要为 Service（如 `upload_service.ts`）或其他核心业务类编写单元测试时，使用此技能生成标准的 Japa 单元测试代码。

## 核心规则与约定
1. **中文强制**：测试用例的 `test.group` 名称、`test` 描述、代码注释等**必须使用中文**。
2. **目录规范**：测试文件应通常放在 `tests/unit/` 目录下，并保持与 `core/services/` 相似的结构。
3. **依赖注入与实例化**：如果 Service 包含 `@inject()` 装饰器（例如依赖了 `HttpContext`、`OssService` 或 `ImageService`），应通过 AdonisJS 容器解析实例：`await app.container.make(ServiceName)`，或在必要时使用 Mock / Stub 替代真实的依赖。
4. **测试隔离**：如果服务涉及数据库操作（例如保存记录到数据库），必须在 `group.each.setup()` 中调用 `testUtils.db().truncate()` 以保证测试环境的干净。

## 测试代码模板（以 Service 为例）

生成测试时，请参考以下模板结构：

```typescript
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import app from '@adonisjs/core/services/app'
// 引入要测试的 Service，例如：
// import { UploadService } from '#core/services/upload_service'

test.group('UploadService - 单元测试', (group) => {
  // 确保测试间状态隔离：每次测试后清空数据表（如果 Service 涉及数据库）
  group.each.setup(() => {
    return testUtils.db().truncate()
  })

  test('验证 Service 可以正常通过容器实例化', async ({ assert }) => {
    // 使用容器解析带有 @inject() 的服务
    // const service = await app.container.make(UploadService)
    // assert.isNotNull(service)
  })

  test('验证本地文件上传并保存到数据库', async ({ assert }) => {
    // 1. 准备测试数据 (Arrange)
    // const service = await app.container.make(UploadService)
    // 模拟文件对象 (MultipartFile)
    
    // 2. 执行业务逻辑 (Act)
    // const result = await service.upload(mockFile)

    // 3. 断言验证 (Assert)
    // assert.isTrue(result.$isPersisted)
    // assert.equal(result.name, 'test.png')
  })
})
```

## 执行步骤
1. 分析用户提供的 Service 代码（重点关注 `@inject()` 的依赖项、核心方法如 `upload`、`local`、`oss` 以及数据库操作）。
2. 按照上述模板和规则，直接生成对应的 `.spec.ts` 单元测试文件内容。
3. 如果涉及文件系统操作（如 Drive）或外部服务（如 OSS），主动在代码中或注释里提供关于如何使用 AdonisJS 的 Drive Fake 或 Mock 对象的建议。