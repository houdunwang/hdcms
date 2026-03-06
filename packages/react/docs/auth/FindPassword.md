# FindPassword 使用指南

找回密码组件，支持邮箱或手机号验证码重置密码。通常与 `AuthLayout` 搭配使用，也可独立引入。

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
import { FindPassword } from '@core/auth'

export function OnlyFindPassword() {
  return <FindPassword>{/* 可传入底部辅助内容 */}</FindPassword>
}
```

## Props

| 属性名      | 类型      | 默认值 | 必填 | 说明                                       |
| ----------- | --------- | -----: | :--: | ------------------------------------------ |
| title       | string    |      - |  否  | 预留标题文案（当前未直接使用）             |
| description | string    |      - |  否  | 预留描述文案（当前未直接使用）             |
| children    | ReactNode |      - |  是  | 卡片底部插槽，常用于放置统一页脚或辅助说明 |

## 使用方式

- 在卡片顶部可切换验证码类型：邮箱找回 / 手机号找回
- 表单字段：验证码、密码、确认密码、图形验证码
- 提交后会调用后端接口完成密码重置，成功后可正常登录

## 右侧说明区域

- 可搭配 `FindPasswordRightSpace` 作为找回密码页的右侧说明区域：

```tsx
import { AuthLayout, FindPasswordRightSpace } from '@core/auth'

export function AuthPage() {
  return <AuthLayout components={{ findPassword: { rightSpace: <FindPasswordRightSpace /> } }} />
}
```
