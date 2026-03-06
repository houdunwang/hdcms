# types 使用指南

该模块定义认证相关组件所使用的类型。主要包含两类：

- `AuthProps`：传递给统一布局 `AuthLayout` 与其页脚 `AuthFooter` 的配置
- `AuthComponentProps`：传递给单个认证子组件（Login / Register / FindPassword / WechatLogin）的配置

## AuthProps

| 字段                  | 类型      | 默认值 | 必填 | 说明                             |
| --------------------- | --------- | -----: | :--: | -------------------------------- |
| className             | string    |      - |  否  | 外层 section 的样式类名          |
| showWechatLoginButton | boolean   |  false |  否  | 是否在页脚展示“使用微信登录”按钮 |
| wechatLoginButton     | ReactNode |      - |  否  | 自定义“微信登录”按钮内容         |
| footerComponent       | ReactNode |      - |  否  | 覆盖默认页脚区域                 |
| helperComponent       | ReactNode |      - |  否  | 卡片底部辅助信息区域             |
| components            | object    |      - |  否  | 针对各子页面的定制项（见下表）   |

子页面定制项 `components.*`：

| 子页面       | 字段        | 类型      | 默认值 | 必填 | 说明                       |
| ------------ | ----------- | --------- | -----: | :--: | -------------------------- |
| login        | title       | string    |      - |  否  | 预留标题（当前未直接渲染） |
| login        | description | string    |      - |  否  | 预留描述（当前未直接渲染） |
| login        | rightSpace  | ReactNode |      - |  否  | 登录页右侧说明区域         |
| register     | title       | string    |      - |  否  | 预留标题（当前未直接渲染） |
| register     | description | string    |      - |  否  | 预留描述（当前未直接渲染） |
| register     | rightSpace  | ReactNode |      - |  否  | 注册页右侧说明区域         |
| findPassword | title       | string    |      - |  否  | 预留标题（当前未直接渲染） |
| findPassword | description | string    |      - |  否  | 预留描述（当前未直接渲染） |
| findPassword | rightSpace  | ReactNode |      - |  否  | 找回密码页右侧说明区域     |
| wechatLogin  | title       | string    |      - |  否  | 预留标题（当前未直接渲染） |
| wechatLogin  | description | string    |      - |  否  | 预留描述（当前未直接渲染） |
| wechatLogin  | rightSpace  | ReactNode |      - |  否  | 微信登录页右侧说明区域     |

## AuthComponentProps

| 字段        | 类型      | 默认值 | 必填 | 说明                                   |
| ----------- | --------- | -----: | :--: | -------------------------------------- |
| title       | string    |      - |  否  | 预留标题文案（当前未直接使用）         |
| description | string    |      - |  否  | 预留描述文案（当前未直接使用）         |
| children    | ReactNode |      - |  是  | 卡片底部插槽，常用于统一页脚或辅助说明 |

## 示例

```tsx
import { AuthLayout, LoginRightSpace } from '@core/auth'

export default function AuthPage() {
  return (
    <AuthLayout
      showWechatLoginButton
      components={{
        login: { rightSpace: <LoginRightSpace /> },
      }}
    />
  )
}
```
