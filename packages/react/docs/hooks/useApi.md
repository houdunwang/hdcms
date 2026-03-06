# useApi 使用指南

整合认证与请求客户端，返回可直接调用的 API Client、认证对象与底层请求客户端。

## 快速上手

```tsx
import { useApi } from '@core/hooks'

export function Demo() {
  const { api, auth, requestClient } = useApi()
  // 例如：登录
  // const mutation = useMutation(api.auth.login.mutationOptions())
  // mutation.mutate({ body: { account, password, captcha } })
  return null
}
```

## 返回值

| 字段          | 类型                     | 默认值 | 说明                                         |
| ------------- | ------------------------ | -----: | -------------------------------------------- |
| api           | Tuyau React Query Client |      - | 基于 `@tuyau/react-query` 创建的 API 客户端  |
| auth          | 对象                     |      - | 认证相关方法与状态（见 useAuth 文档）        |
| requestClient | Tuyau Client             |      - | 底层 HTTP 客户端（见 useRequestClient 文档） |

## 适用场景

- 在组件中需要同时访问 API 与认证状态时
- 统一拿到 `api`、`auth` 与 `requestClient`，减少样板代码
