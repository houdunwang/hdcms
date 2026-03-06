# @core/form 模块说明

- 提供与 tanstack/react-form 集成的上下文与常用字段组件
- 统一从该入口导出所有表单相关组件与类型

## 导出内容

- 上下文与 Hook：`fieldContext`、`formContext`、`useFieldContext`、`useFormContext`
- 组件：`FieldInput`、`FieldCaptcha`、`FieldCode`、`FieldImage`、`FieldSubmitButton`、`FieldValidateError`、`SendCodeButton`
- 类型：`FormFieldProps`、`IFieldApi`

## 基本用法

```tsx
import { createFormHook } from '@tanstack/react-form'
import {
  fieldContext, formContext,
  FieldInput, FieldSubmitButton,
} from '@core/form'

const { useAppForm } = createFormHook({
  fieldComponents: { FieldInput },
  formComponents: { FieldSubmitButton },
  fieldContext,
  formContext,
})
```

## 相关源码

- [index.ts](file:///Users/hd/code/framework/packages/react/core/form/index.ts)
