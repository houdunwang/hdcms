# Login 使用指南

登录组件，提供邮箱 / 手机号 / 用户名 + 验证码的登录方式。通常与 `AuthLayout` 搭配使用，也可独立引入。

## 快速上手

- 在统一认证页面中使用（推荐）：

```tsx
import { AuthLayout } from '@core/auth'

export function AuthPage() {
  return <AuthLayout />
}
```

- 独立引入：

```tsx
import { Login } from '@core/auth'

export function OnlyLogin() {
  return <Login>{/* 可传入底部辅助内容 */}</Login>
}
```

## Props

| 属性名      | 类型      | 默认值 | 必填 | 说明                                       |
| ----------- | --------- | -----: | :--: | ------------------------------------------ |
| title       | string    |      - |  否  | 预留标题文案（当前未直接使用）             |
| description | string    |      - |  否  | 预留描述文案（当前未直接使用）             |
| children    | ReactNode |      - |  是  | 卡片底部插槽，常用于放置统一页脚或辅助说明 |

> 说明：在 `AuthLayout` 中使用时，通常将统一的页脚或辅助说明作为 `children` 传入以保持一致布局。

## 表单行为

- 字段：帐号、密码、验证码
- 提交后会调用后端登录接口，成功后自动建立登录态

## 右侧说明区域

- 可搭配 `LoginRightSpace` 作为登录页的右侧说明区域：

```tsx
import { AuthLayout, LoginRightSpace } from '@core/auth'

export function AuthPage() {
  return <AuthLayout components={{ login: { rightSpace: <LoginRightSpace /> } }} />
}
```
