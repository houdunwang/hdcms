# AuthFooter 使用指南

统一认证页脚组件，用于在登录/注册/找回密码等页面底部展示快捷入口与微信登录按钮。通常由 `AuthLayout` 自动注入，也可独立替换或自定义。

## 快速上手

- 在 `AuthLayout` 中默认作为子组件插入各页面卡片底部，开发者无需单独引入。
- 如需独立使用或自定义：可通过 `footerComponent` 与 `wechatLoginButton` 完全覆盖默认内容。

## Props

| 属性名                | 类型      | 默认值 | 必填 | 说明                                                     |
| --------------------- | --------- | -----: | :--: | -------------------------------------------------------- |
| showWechatLoginButton | boolean   |  false |  否  | 是否展示“使用微信登录”按钮                               |
| wechatLoginButton     | ReactNode |      - |  否  | 自定义微信登录按钮内容（不传则使用默认样式按钮）         |
| footerComponent       | ReactNode |      - |  否  | 覆盖默认页脚（默认提供 登录 / 注册 / 找回密码 三个链接） |

> 说明：`AuthFooter` 接受的 `props` 类型为 `AuthProps`，除以上与页脚相关的字段外，其他字段将被忽略。

## 示例

自定义微信登录按钮与页脚：

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
