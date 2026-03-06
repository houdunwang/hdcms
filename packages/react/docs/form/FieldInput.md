# FieldInput 使用指南

- 表单字段输入组件，依赖 tanstack/react-form 的 Field 上下文
- 自动处理 value/onChange/onBlur/id/name，避免手动绑定
- 当 type 为 password 时自动设置 autoComplete 为 new-password，否则为 off
- 集成 FieldValidateError 展示校验或请求错误

## 导入

```tsx
import { FieldInput } from '@core/form'
```

## 使用示例

```tsx
import { createFormHook } from '@tanstack/react-form'
import { FieldInput, fieldContext, formContext, FieldSubmitButton } from '@core/form'
import z from 'zod'

const { useAppForm } = createFormHook({
  fieldComponents: { FieldInput },
  formComponents: { FieldSubmitButton },
  fieldContext,
  formContext,
})

export function Demo() {
  const form = useAppForm({
    defaultValues: { username: '', password: '' },
    onSubmit: async ({ value }) => { /* 提交逻辑 */ },
  })

  return (
    <form onSubmit={(e) => { e.preventDefault(); void form.handleSubmit() }}>
      <form.AppField
        name="username"
        validators={{ onChange: z.string().min(1, '请输入用户名') }}
        children={(field) => <field.FieldInput label="用户名" placeholder="请输入用户名" />}
      />
      <form.AppField
        name="password"
        validators={{ onChange: z.string().min(5, '密码不能少于5位') }}
        children={(field) => <field.FieldInput label="密码" type="password" />}
      />
      <form.AppForm>
        <form.FieldSubmitButton label="保存提交" />
      </form.AppForm>
    </form>
  )
}
```

## Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| label | React.ReactNode | - | 否 | 字段标签文案 |
| description | React.ReactNode | - | 否 | 字段描述文案（可搭配 Field 组件描述位） |
| className | string | - | 否 | 外层 Field 容器样式 |
| fieldClassName | string | - | 否 | 输入框样式 |
| type | React.ComponentProps<'input'>['type'] | text | 否 | 原生 input 类型 |
| 其余 input 属性 | 参考原生 input | - | 否 | 除 name/value/onChange/onBlur/id 以外的属性可透传 |

## 相关源码

- [FieldInput.tsx](file:///Users/hd/code/framework/packages/react/core/form/FieldInput.tsx)
