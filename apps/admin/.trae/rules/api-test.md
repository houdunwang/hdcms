---
alwaysApply: false
description: 编写 AdonisJS API 测试时的强制要求
---

# API 测试核心规则

编写 AdonisJS API 测试时的强制要求：

1. **中文强制**：回答、测试用例描述 (`test.group`, `test`) 及注释必须使用中文。
2. **位置约定**：测试针对的控制器在 `core/controllers` 或 `controllers`，路由在 `routes` 或 `routes.ts`。
3. **测试规范**：
   - 使用 `@japa/api-client` 的 `client.visit('route_name')` 发起请求。
   - **必须**使用 `testUtils.db().truncate()` 确保数据库测试隔离。

> 💡 **提示**：具体代码模板与生成逻辑请使用 `adonis-api-test` 技能。
