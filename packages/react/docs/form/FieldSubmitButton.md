# FieldSubmitButton 使用指南

- 表单提交按钮组件，自动订阅 isSubmitting 状态
- 提交中禁用按钮并显示加载指示

## 导入

```tsx
import { FieldSubmitButton } from '@core/form'
```

## 使用示例

```tsx
import { createFormHook } from '@tanstack/react-form'
import { FieldSubmitButton, fieldContext, formContext } from '@core/form'

const { useAppForm } = createFormHook({
  formComponents: { FieldSubmitButton },
  fieldContext,
  formContext,
})

export function Demo() {
  const form = useAppForm({
    defaultValues: {},
    onSubmit: async ({ value }) => { /* 提交逻辑 */ },
  })
  return (
    <form onSubmit={(e) => { e.preventDefault(); void form.handleSubmit() }}>
      <form.AppForm>
        <form.FieldSubmitButton label="保存提交" className="w-full" />
      </form.AppForm>
    </form>
  )
}
```

## Props

| 参数 | 类型 | 默认值 | 必填 | 说明 |
| --- | --- | --- | --- | --- |
| label | React.ReactNode | "保存提交" | 否 | 按钮文案 |
| description | React.ReactNode | - | 否 | 预留描述位 |
| fieldClassName | string | - | 否 | 外层容器样式 |
| buttonClassName | string | - | 否 | 预留按钮样式（当前实现未使用） |
| className | string | - | 否 | 按钮样式 |
| 其余 button 属性 | 参考原生 button | - | 否 | 除 name/value/onChange/onBlur/id 外属性可透传 |

## 行为说明

- 订阅表单 isSubmitting 状态，提交中禁用并切换为 outline 样式
- 提交中显示加载指示与“提交中...”文案

## 相关源码

- [FieldSubmitButton.tsx](file:///Users/hd/code/framework/packages/react/core/form/FieldSubmitButton.tsx)
