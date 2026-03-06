# Register 使用指南

注册组件，提供帐号、密码、确认密码与验证码的注册流程。通常与 `AuthLayout` 搭配使用，也可独立引入。

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
import { Register } from '@core/auth'

export function OnlyRegister() {
  return <Register>{/* 可传入底部辅助内容 */}</Register>
}
```

## Props

| 属性名 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | ---: | :--: | --- |
| title | string | - | 否 | 预留标题文案（当前未直接使用） |
| description | string | - | 否 | 预留描述文案（当前未直接使用） |
| children | ReactNode | - | 是 | 卡片底部插槽，常用于放置统一页脚或辅助说明 |

## 表单行为

- 字段：帐号、密码、确认密码、验证码
- 提交后会调用后端注册接口，成功后自动建立登录态

## 右侧说明区域

- 可搭配 `RegisterRightSpace` 作为注册页的右侧说明区域：

```tsx
import { AuthLayout, RegisterRightSpace } from '@core/auth'

export function AuthPage() {
  return (
    <AuthLayout
      components={{ register: { rightSpace: <RegisterRightSpace /> } }}
    />
  )
}
```

