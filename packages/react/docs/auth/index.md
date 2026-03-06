# index 使用指南

认证模块的入口导出文件，便于从单一路径按需导入各类组件。

## 导出内容

- AuthLayout：统一认证页面布局
- Login：登录组件
- Register：注册组件
- WechatLogin：微信扫码登录组件
- FindPassword：找回密码组件

## 导入示例

```tsx
import { AuthLayout, Login, Register, WechatLogin, FindPassword } from '@core/auth'

export function AuthPage() {
  return <AuthLayout />
}
```

> 说明：也可按需从具体路径导入单个组件，如 `@core/auth/Login`。

