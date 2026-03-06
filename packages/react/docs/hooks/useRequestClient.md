# useRequestClient 使用指南

创建带有统一拦截器的 HTTP 客户端，内置鉴权、消息提示与校验错误处理，基于 `@tuyau/core`。

## 快速上手

```tsx
import { useRequestClient } from '@core/hooks'

export function Demo() {
  const client = useRequestClient()
  // 直接调用：client.get('/path'), client.post('/path', { body })
  return null
}
```

## 返回值

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | ---: | --- |
| client | Tuyau Client | - | 统一的 HTTP 客户端，包含拦截器 |

## 内置拦截器

- beforeRequest
  - 自动注入 `Authorization: Bearer <token>`（若存在）
  - 重置表单字段错误状态
- afterResponse
  - 对成功响应中包含 `data.message` 的情况进行成功提示
- beforeError
  - 无响应：提示网络连接失败
  - 401：清除 token 并跳转到 `/auth/login`
  - 429：提示服务端返回的限流信息
  - 422：将校验错误写入字段错误状态（字段-错误文案映射）
  - 其他：提示统一错误消息或服务端返回的 `message`

