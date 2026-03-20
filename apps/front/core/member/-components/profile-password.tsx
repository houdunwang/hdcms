import { FieldCaptcha } from "#core/form"
import { FieldInput } from "#core/form"
import { FieldSubmitButton } from "#core/form"
import { fieldContext, formContext } from "#core/form"
import { useApi } from "#core/hooks"
import { createFormHook } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import z from "zod"

export const ProfilePassword = (): React.JSX.Element => {
  const api = useApi()
  const mutation = useMutation(api.users.password.mutationOptions())
  const { useAppForm } = createFormHook({
    fieldComponents: {
      FieldInput,
      FieldCaptcha
    },
    formComponents: {
      FieldSubmitButton
    },
    fieldContext,
    formContext
  })

  const form = useAppForm({
    defaultValues: {
      old_password: '',
      password: '',
      password_confirmation: '',
      captcha: ''
    },
    validators: {
      onChange: z.object({
        old_password: z.string().min(5, '旧密码不能少于5位'),
        password: z.string().min(5, '新密码不能少于5位'),
        password_confirmation: z.string().min(5, '确认新密码不能少于5位'),
        captcha: z.string().min(1, '请输入验证码'),
      }).refine((data) => data.password === data.password_confirmation, {
        message: "两次输入的密码不一致",
        path: ["password_confirmation"],
      })
    },
    onSubmit: async ({ value: body }) => {
      await mutation.mutateAsync({ body })
    }
  })
  return (
    <form autoComplete="off"
      className="space-y-3"
      onSubmit={e => {
        e.preventDefault()
        void form.handleSubmit()
      }} >
      <form.AppField name="old_password" children={field => <field.FieldInput label="旧密码" type="password" />} />
      <form.AppField name="password" children={field => <field.FieldInput label="新密码" type="password" />} />
      <form.AppField name="password_confirmation" children={field => <field.FieldInput label="确认新密码" type="password" />} />
      <form.AppField name="captcha" children={field => <field.FieldCaptcha label="验证码" />} />

      <form.AppForm>
        <form.FieldSubmitButton className="flex justify-start" />
      </form.AppForm>
    </form>
  )
}
