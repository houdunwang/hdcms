# FieldCode 使用指南

- 验证码输入组件，支持邮箱或手机号通道
- 自动渲染账号输入与验证码输入，并提供发送验证码按钮
- 内置 zod 验证规则与错误展示

## 导入

```tsx
import { FieldCode } from '@core/form'
```

## 使用示例

```tsx
import { createFormHook } from '@tanstack/react-form'
import { FieldCode, FieldSubmitButton, fieldContext, formContext } from '@core/form'

const { useAppForm } = createFormHook({
  fieldComponents: { FieldCode },
  formComponents: { FieldSubmitButton },
  fieldContext,
  formContext,
})

export function Demo() {
  const form = useAppForm({
    defaultValues: { email: '', mobile: '', code: '' },
    onSubmit: async ({ value }) => { /* 提交逻辑 */ },
  })
  return (
    <form onSubmit={(e) => { e.preventDefault(); void form.handleSubmit() }}>
      {/* 邮箱验证码 */}
      <form.AppField name="email" children={(field) => <field.FieldCode type="email" />} />

      {/* 或者 手机验证码 */}
      {/* <form.AppField name="mobile" children={(field) => <field.FieldCode type="mobile" />} /> */}

      <form.AppForm>
        <form.FieldSubmitButton label="提交" />
      </form.AppForm>
    </form>
  )
}
```

## Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| type | 'email' \| 'mobile' | - | 是 | 验证码发送通道；会渲染对应账号与验证码输入 |
| label | React.ReactNode | - | 否 | 账号输入框标签（由组件内部使用） |
| description | React.ReactNode | - | 否 | 字段描述 |
| className | string | - | 否 | 外层 Field 容器样式（用于第二个验证码输入的容器） |
| fieldClassName | string | - | 否 | 输入框样式 |
| 其余 input 属性 | 参考原生 input | - | 否 | 透传给两个 input（账号与验证码） |

## 行为说明

- 根据 type 渲染并校验邮箱或手机号
- 会在表单中维护 code 字段用于输入收到的验证码
- 右侧按钮通过 SendCodeButton 发送验证码，含倒计时与防重复提交

## 相关源码

- [FieldCode.tsx](file:///Users/hd/code/framework/packages/react/core/form/FieldCode.tsx)
- [SendCodeButton.tsx](file:///Users/hd/code/framework/packages/react/core/form/SendCodeButton.tsx)
