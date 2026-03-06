# FieldCaptcha 使用指南

- 图片加法验证码输入组件，依赖表单 Field 上下文
- 自动拉取验证码并将 captcha_key 写入表单值，用于后端校验
- 点击右侧验证码区域可刷新验证码
- 集成 FieldValidateError 展示校验或请求错误

## 导入

```tsx
import { FieldCaptcha } from '@core/form'
```

## 使用示例

```tsx
import { createFormHook } from '@tanstack/react-form'
import { FieldCaptcha, FieldSubmitButton, fieldContext, formContext } from '@core/form'
import z from 'zod'

const { useAppForm } = createFormHook({
  fieldComponents: { FieldCaptcha },
  formComponents: { FieldSubmitButton },
  fieldContext,
  formContext,
})

export function Demo() {
  const form = useAppForm({
    defaultValues: { captcha: '' },
    onSubmit: async ({ value }) => { /* 提交逻辑 */ },
  })
  return (
    <form onSubmit={(e) => { e.preventDefault(); void form.handleSubmit() }}>
      <form.AppField
        name="captcha"
        validators={{ onChange: z.string().min(1, '请输入验证码') }}
        children={(field) => <field.FieldCaptcha label="验证码" />}
      />
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
| label | React.ReactNode | - | 否 | 字段标签文案 |
| description | React.ReactNode | - | 否 | 字段描述文案 |
| className | string | - | 否 | 外层 Field 容器样式 |
| fieldClassName | string | - | 否 | 输入框样式 |
| type | React.ComponentProps<'input'>['type'] | text | 否 | 原生 input 类型 |
| 其余 input 属性 | 参考原生 input | - | 否 | 除 name/value/onChange/onBlur/id 以外的属性可透传 |

## 行为说明

- 首次或刷新时自动获取验证码并在表单中设置 captcha_key
- 输入框 placeholder 为“请输入右侧加法结果”
- 右侧区域点击将重新拉取验证码；加载中显示加载动画

## 相关源码

- [FieldCaptcha.tsx](file:///Users/hd/code/framework/packages/react/core/form/FieldCaptcha.tsx)
