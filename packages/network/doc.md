# 网络请求模块使用文档

面向使用者的指南，仅介绍如何使用本模块完成常见网络请求需求。

## 安装与导入

- 模块名：`@houdunyun/network`
- 在应用中直接导入使用：

```ts
import { createClient, api, createQueryFn, createMutationFn } from '@houdunyun/network'
```

## 创建客户端

- 建议在应用初始化阶段创建一个共享客户端实例：

```ts
const client = createClient({
  baseURL: import.meta.env.VITE_API_URL,
  getToken: () => localStorage.getItem('token') || undefined,
})
```

- 配置项说明（常用）：
  - `baseURL`：接口基础地址
  - `getToken`：返回当前访问令牌（如从 localStorage 读取）
  - `onRequest`/`onResponse`/`onResponseError`：可选的请求/响应拦截回调
  - `onUnauthorized`：可选的未授权回调（如清理状态、跳转登录）
  - `retry`/`retryDelay`/`retryStatusCodes`：可选的重试策略
  - `refreshToken`：可选的刷新令牌函数（见下方“刷新令牌与并发”）

## 基础请求

- GET

```ts
const user = await client.get<{ id: number; name: string }>('/core/users/1')
```

- POST

```ts
const created = await client.post<{ id: number }>('/core/users', { name: 'A' })
```

- PUT

```ts
const updated = await client.put('/core/users/1', { name: 'B' })
```

- PATCH

```ts
await client.patch('/core/users/1', { active: true })
```

- DELETE

```ts
await client.delete('/core/users/1')
```

- 原始调用（保留最大灵活度）

```ts
const res = await client.raw<Response>('/core/system/status', { method: 'GET' })
```

## 一次性便捷请求

- 不创建客户端时，可直接使用 `api`：

```ts
const data = await api<{ ok: boolean }>('/core/ping', {
  baseURL: import.meta.env.VITE_API_URL,
  method: 'GET',
})
```

## 拦截器用法

- 请求拦截：统一注入头信息、埋点等

```ts
const client = createClient({
  baseURL: import.meta.env.VITE_API_URL,
  getToken: () => localStorage.getItem('token') || undefined,
  onRequest: ({ options }) => {
    const h = new Headers(options.headers as HeadersInit)
    h.set('x-trace-id', crypto.randomUUID())
    if (!h.get('content-type')) h.set('content-type', 'application/json')
    options.headers = h
  },
})
```

- 响应拦截：统一提示、日志等

```ts
const client = createClient({
  baseURL: import.meta.env.VITE_API_URL,
  onResponse: ({ response }) => {
    // 例如统一日志或处理通用返回结构
  },
  onResponseError: ({ response }) => {
    // 统一错误提示或上报
  },
})
```

- 未授权处理：

```ts
const client = createClient({
  baseURL: import.meta.env.VITE_API_URL,
  onUnauthorized: () => {
    localStorage.removeItem('token')
    window.location.assign('/login')
  },
})
```

## 刷新令牌与并发

- 提供 `refreshToken` 后，模块会在首次遇到 401 时触发一次刷新，并在刷新成功后自动重试原请求
- 并发场景下只会发起“一次刷新”，其他请求等待刷新完成后各自重试
- 如果第一次刷新失败，后续 401 不再刷新，直接抛错，便于应用统一引导用户重新登录

```ts
import { ofetch } from 'ofetch'

const refreshClient = ofetch.create({
  baseURL: import.meta.env.VITE_API_URL,
  retry: 0,
  onRequest: ({ options }) => {
    const h = new Headers(options.headers as HeadersInit)
    h.set('accept', 'application/json')
    options.headers = h
    options.credentials = 'include'
  },
})

const client = createClient({
  baseURL: import.meta.env.VITE_API_URL,
  getToken: () => localStorage.getItem('token') || undefined,
  refreshToken: async () => {
    const { token } = await refreshClient<{ token: string }>('/core/refresh', { method: 'POST' })
    localStorage.setItem('token', token)
  },
  onUnauthorized: () => {
    localStorage.removeItem('token')
    window.location.assign('/login')
  },
})
```

## 与 React Query 集成

- 查询函数

```ts
import { createQueryFn } from '@houdunyun/network'
import { useQuery } from '@tanstack/react-query'

const usersQueryFn = createQueryFn<{ list: any[] }>(client, '/core/users')

const { data, isLoading } = useQuery({
  queryKey: ['users'],
  queryFn: usersQueryFn,
})
```

- 变更函数

```ts
import { createMutationFn } from '@houdunyun/network'
import { useMutation } from '@tanstack/react-query'

const loginMutationFn = createMutationFn<{ account: string; password: string }, { token: string }>(
  client,
  'POST',
  '/core/login'
)

const login = useMutation({ mutationFn: loginMutationFn })
login.mutate({ account: 'a', password: 'b' })
```

## 统一业务返回结构解包

- 如果后端返回统一包裹结构（例如 `{ code, message, data }` 或 `{ success, result }`），可以在 `onResponse` 中把外层包裹“解开”，让后续拿到的就是业务数据

```ts
// 解包 { code, message, data } -> data
const client = createClient({
  baseURL: import.meta.env.VITE_API_URL,
  onResponse: ({ response }) => {
    const d = (response as any)._data
    if (d && typeof d === 'object' && 'data' in d) {
      ;(response as any)._data = d.data
    }
  },
})
```

```ts
// 解包 { success, result } -> result
const client = createClient({
  baseURL: import.meta.env.VITE_API_URL,
  onResponse: ({ response }) => {
    const d = (response as any)._data
    if (d && typeof d === 'object' && 'result' in d) {
      ;(response as any)._data = d.result
    }
  },
})
```

## 常见建议

- 在 `getToken` 中返回当前有效令牌；刷新成功后及时写入新令牌
- 在 `onUnauthorized` 中统一处理未授权，例如清理本地状态并跳转登录
- 需要 Cookie 的接口（如刷新）可设置 `credentials: 'include'`
- 对于业务统一返回结构，可在 `onResponse` 中进行统一解包
