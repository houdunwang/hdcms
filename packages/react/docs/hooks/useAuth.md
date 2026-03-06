# useAuth 使用指南

提供认证相关的状态与方法，包括登录、获取当前用户、登出与是否已认证等。

## 快速上手

```tsx
import { useAuth } from '@core/hooks'

export function Demo() {
  const { isAuthenticated, login, getCurrentUser, logout, user } = useAuth()
  // 页面加载后尝试获取当前用户
  // useEffect(() => { void getCurrentUser() }, [])
  return null
}
```

## 返回值

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | ---: | --- |
| isAuthenticated | boolean | - | 是否已登录（基于本地 token 判断） |
| login | (data) => void | - | 登录成功后写入 token 并跳转到历史记录页面或首页 |
| getCurrentUser | () => Promise<void> | - | 已有 token 时请求当前用户信息并写入状态 |
| logout | () => void | - | 清除 token 与用户状态，跳转首页 |
| user | object | - | 当前用户对象（来自 jotai 状态） |
| setUser | (user) => void | - | 更新用户对象 |

## 行为说明

- 登录：若 `data.token` 存在则写入到 `localStorage(AuthEnum.TOKEN_NAME)`，随后根据本地 `history` 跳转
- 获取当前用户：当存在 token 时，调用 `/core/users/me` 获取用户并写入状态
- 未认证访问：若检测到未登录且不在 `/auth/` 页面，会记录当前 URL 到本地 `history`，用于登录后跳转
- 登出：移除 token，清空用户信息并跳转至 `/`

