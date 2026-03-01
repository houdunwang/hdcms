import { FieldCaptcha } from "@core/components/form/FieldCaptcha"
import { FieldInput } from "@core/components/form/FieldInput"
import { FieldSubmitButton } from "@core/components/form/FieldSubmitButton"
import { fieldContext, formContext } from "@core/hd"
import { useApi } from "@core/hooks/useApi"
import { createFormHook } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"

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
      <form.AppField name="old_password" children={field => <field.FieldInput label="旧密码" />} />
      <form.AppField name="password" children={field => <field.FieldInput label="新密码" />} />
      <form.AppField name="password_confirmation" children={field => <field.FieldInput label="确认新密码" />} />
      <form.AppField name="captcha" children={field => <field.FieldCaptcha label="验证码" />} />

      <form.AppForm>
        <form.FieldSubmitButton className="flex justify-start" />
      </form.AppForm>
    </form>
  )
}
