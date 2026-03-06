# AuthLayout 使用指南

统一的认证页面布局组件，基于路由查询参数自动切换登录、注册、找回密码与微信登录等子页面，同时支持右侧说明区域与底部辅助信息的插槽化扩展。

## 快速上手

```tsx
import { AuthLayout } from '@core/auth/AuthLayout'

export default function AuthPage() {
  return <AuthLayout />
}
```

- 页面切换：通过路由查询参数 `action` 控制
  - `/auth?action=login`
  - `/auth?action=register`
  - `/auth?action=findPassword`
  - `/auth?action=wechatLogin`

## Props

| 属性名                             | 类型      | 默认值 | 必填 | 说明                                                 |
| ---------------------------------- | --------- | -----: | :--: | ---------------------------------------------------- |
| className                          | string    |      - |  否  | 外层 section 的样式类名                              |
| showWechatLoginButton              | boolean   |  false |  否  | 是否在页脚展示“使用微信登录”按钮                     |
| wechatLoginButton                  | ReactNode |      - |  否  | 自定义“微信登录”按钮内容（不传则使用默认按钮）       |
| footerComponent                    | ReactNode |      - |  否  | 覆盖默认页脚（默认包含 登录/注册/找回密码 跳转链接） |
| helperComponent                    | ReactNode |      - |  否  | 卡片底部辅助信息区域（有值时会出现分隔线与说明）     |
| components.login.rightSpace        | ReactNode |      - |  否  | 登录页右侧说明区域                                   |
| components.register.rightSpace     | ReactNode |      - |  否  | 注册页右侧说明区域                                   |
| components.findPassword.rightSpace | ReactNode |      - |  否  | 找回密码页右侧说明区域                               |
| components.wechatLogin.rightSpace  | ReactNode |      - |  否  | 微信登录页右侧说明区域                               |
| components.\*.title                | string    |      - |  否  | 预留标题文案（当前未直接渲染）                       |
| components.\*.description          | string    |      - |  否  | 预留描述文案（当前未直接渲染）                       |

> 说明：`AuthLayout` 会根据 `action` 自动加载对应子组件，并在卡片底部注入统一页脚 `AuthFooter`。当提供 `rightSpace` 时，布局自动切换为“左侧内容 + 右侧说明”双列结构。

## 自定义示例

右侧说明与辅助区域：

```tsx
import { AuthLayout } from '@core/auth'
import {
  LoginRightSpace,
  RegisterRightSpace,
  FindPasswordRightSpace,
  WechatRightSpace,
} from '@core/auth'

export default function AuthPage() {
  return (
    <AuthLayout
      helperComponent={<span>登录/注册即表示你同意相关服务条款</span>}
      components={{
        login: { rightSpace: <LoginRightSpace /> },
        register: { rightSpace: <RegisterRightSpace /> },
        findPassword: { rightSpace: <FindPasswordRightSpace /> },
        wechatLogin: { rightSpace: <WechatRightSpace /> },
      }}
    />
  )
}
```

自定义页脚与微信登录按钮：

```tsx
import { AuthLayout } from '@core/auth'

export default function AuthPage() {
  return (
    <AuthLayout
      showWechatLoginButton
      wechatLoginButton={
        <button className="w-full border rounded-lg py-2">使用企业微信登录</button>
      }
      footerComponent={
        <div className="text-center text-xs text-muted-foreground">
          登录即表示同意《用户协议》和《隐私政策》
        </div>
      }
    />
  )
}
```

## 其他说明

- 依赖 TanStack Router 的路由查询参数解析，`action` 缺省时默认显示登录页。
- 背景包含轻量的渐变动画装饰，提升页面视觉层次，无需额外配置。
