---
alwaysApply: false
description: 编写 AdonisJS 单元测试时的强制要求
---

# 单元测试核心规则

编写 AdonisJS 单元测试（尤其是针对 Service 等业务类）时的强制要求：

1. **中文强制**：回答、测试用例描述 (`test.group`, `test`) 及注释必须使用中文。
2. **位置约定**：测试文件通常放在 `tests/unit/` 或与被测文件对应的目录结构中。
3. **测试规范**：
   - 针对 Service 等类（如 `upload_service.ts`），需保证测试的独立性。
   - 若涉及数据库操作，**必须**使用 `testUtils.db().truncate()` 确保数据库测试隔离。
   - 若类使用了 `@inject()` 依赖注入，应通过 AdonisJS 容器 `app.container.make()` 获取实例。

> 💡 **提示**：具体代码模板与生成逻辑请使用 `adonis-unit-test` 技能。
