# hdCreateFormHook 使用指南

封装 `createFormHook` 的工厂方法，提供内置字段组件（`FieldInput`、`FieldCode`）与提交按钮，并支持按需扩展。

## 快速上手

```tsx
import { hdCreateFormHook } from '@core/hooks'

const { useAppForm } = hdCreateFormHook()

function DemoForm() {
  const form = useAppForm({
    defaultValues: { account: '', password: '' },
    onSubmit: async ({ value }) => {
      // 提交逻辑
    },
  })
  return (
    <form autoComplete="off" onSubmit={(e) => { e.preventDefault(); void form.handleSubmit() }}>
      <form.AppField name="account" children={(field) => <field.FieldInput label="帐号" />} />
      <form.AppField name="password" children={(field) => <field.FieldInput label="密码" type="password" />} />
      <form.AppForm>
        <form.FieldSubmitButton type="submit" label="提交" />
      </form.AppForm>
    </form>
  )
}
```

## 参数

| 参数名 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | ---: | :--: | --- |
| components | Partial<{ FieldInput; FieldCode; ... }> | - | 否 | 覆盖或扩展字段组件集合 |

## 返回值

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | ---: | --- |
| useAppForm | (options) => Form | - | 由 `createFormHook` 生成的表单 Hook，包含 `AppField`、`AppForm`、`FieldSubmitButton` 等组件 |

## 说明

- 内置字段组件：`FieldInput`、`FieldCode`
- 内置表单组件：`FieldSubmitButton`
- 上下文：自动绑定 `fieldContext` 与 `formContext`

