# hooks/index 使用指南

Hooks 模块的入口导出文件，便于从单一路径按需导入各类 Hook 与辅助方法。

## 导出内容

- useApi：统一获取 API 客户端与认证对象
- useAuth：认证状态与方法
- useRequestClient：统一 HTTP 客户端（含拦截器）
- hdCreateFormHook：表单 Hook 工厂（封装默认字段与上下文）
- useResponsive：响应式断点检测

## 导入示例

```tsx
import { useApi, useAuth, useRequestClient, hdCreateFormHook, useResponsive } from '@core/hooks'
```
