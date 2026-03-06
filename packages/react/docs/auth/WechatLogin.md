# WechatLogin 使用指南

该组件用于在认证流程中提供“微信扫码安全登录”。用户通过手机微信扫描二维码并授权后，系统自动完成登录状态的建立。

## 快速上手

- 在统一认证页面中使用（推荐）：

  ```tsx
  import { AuthLayout } from '@core/auth/AuthLayout'

  export function AuthPage() {
    return <AuthLayout />
  }
  ```

  - 页面切换：`/auth?action=wechatLogin`
  - 可通过 `components.wechatLogin.rightSpace` 注入右侧说明区域

- 独立引入（不通过统一布局）：

  ```tsx
  import { WechatLogin } from '@core/auth/WechatLogin'

  export function WechatOnly() {
    return <WechatLogin>{/* 可传入底部辅助内容 */}</WechatLogin>
  }
  ```

## Props

| 属性名      | 类型      | 默认值 | 必填 | 说明                                       |
| ----------- | --------- | -----: | :--: | ------------------------------------------ |
| title       | string    |      - |  否  | 预留标题文案（当前未直接使用）             |
| description | string    |      - |  否  | 预留描述文案（当前未直接使用）             |
| children    | ReactNode |      - |  是  | 底部插槽区域，常用于放置辅助说明或页脚内容 |

> 说明：在 `AuthLayout` 中使用时，通常将统一的页脚或辅助说明作为 `children` 传入以保持一致的布局体验。

## 使用流程

- 打开页面后呈现微信二维码。
- 用户使用手机微信扫描二维码并授权。
- 授权成功后系统完成登录状态建立，页面进入已登录态。

## 常见集成点

- 右侧说明区域：在统一认证布局中通过 `components.wechatLogin.rightSpace` 注入，例如：

  ```tsx
  import { AuthLayout } from '@core/auth/AuthLayout'
  import { WechatRightSpace } from '@core/auth/WechatLogin'

  export function AuthPage() {
    return (
      <AuthLayout
        components={{
          wechatLogin: { rightSpace: <WechatRightSpace /> },
        }}
      />
    )
  }
  ```

- 页脚内容：通过 `children` 传入底部辅助区域（如提示、安全说明等）。

## 依赖与前置

- 需要具备微信登录后端接口与二维码生成能力（前端内置二维码组件会在授权成功后自动完成登录数据处理）。
- 页面应在 HTTPS 环境与可信域名下部署，以保证授权流程的稳定性与安全性。

## 示例（组合统一认证布局与微信扫码）

```tsx
import { AuthLayout } from '@core/auth/AuthLayout'
import { Button } from '@/components/ui/button'
import { WechatRightSpace } from '@core/auth/WechatLogin'

export function AuthPage() {
  return (
    <AuthLayout
      showWechatLoginButton
      wechatLoginButton={
        <Button variant="default" size="lg" className="w-full">
          使用微信快速登录
        </Button>
      }
      components={{
        wechatLogin: { rightSpace: <WechatRightSpace /> },
      }}
    />
  )
}
```

## WechatRightSpace（右侧说明组件）

- 提供与微信登录相关的介绍与站点亮点展示。
- 无 props，直接作为插槽组件使用。

## 使用建议

- 将微信登录放入统一认证布局中，使用查询参数进行页面切换，保持认证入口一致性。
- 在底部适当提供账号安全提示，提升用户信任与使用体验。
