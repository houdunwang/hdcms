# SendCodeButton 使用指南

- 验证码发送按钮组件，支持邮箱与手机号
- 内置倒计时、防重复发送与输入合法性校验

## 导入

```tsx
import { SendCodeButton } from '@core/form'
```

## 使用示例

```tsx
import { SendCodeButton } from '@core/form'

export function Demo({ type, value }: { type: 'email' | 'mobile'; value: string }) {
  return <SendCodeButton type={type} value={value} />
}
```

通常配合 FieldCode 使用，无需单独引入。

## Props

| 参数  | 类型                | 默认值 | 必填 | 说明               |
| ----- | ------------------- | ------ | ---- | ------------------ |
| type  | 'email' \| 'mobile' | -      | 是   | 发送通道           |
| value | string              | -      | 是   | 对应的邮箱或手机号 |

## 行为说明

- 安全校验 value 有效性，不合法时通过 toast 提示
- 倒计时与并发状态会禁用按钮；文案显示“X秒后再试”
- 发送成功或服务端限制返回剩余秒数时，会写入 localStorage('remainingSeconds') 并继续倒计时

## 相关源码

- [SendCodeButton.tsx](file:///Users/hd/code/framework/packages/react/core/form/SendCodeButton.tsx)
