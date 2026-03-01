import { FieldCaptcha } from "@core/components/form/FieldCaptcha"
import { FieldInput } from "@core/components/form/FieldInput"
import { FieldSubmitButton } from "@core/components/form/FieldSubmitButton"
import { fieldContext, formContext } from "@core/hd"
import { useApi } from "@core/hooks/useApi"
import { createFormHook } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import z from "zod"

export const ProfilePassword = () => {
  const { auth, api } = useApi()
  const mutation = useMutation(api.users.password.mutationOptions({
    onSuccess: ({ data }) => {
      console.log('data', data)
    }
  }))
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
      onSubmit: z.object({
        old_password: z.string().min(5, '旧密码不能少于5位'),
        password: z.string().min(5, '新密码不能少于5位'),
        password_confirmation: z.string().min(5, '确认新密码不能少于5位'),
        captcha: z.string().min(1, '请输入验证码'),
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
