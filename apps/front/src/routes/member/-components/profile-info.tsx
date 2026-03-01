import { FieldInput } from "@core/components/form/FieldInput"
import { FieldSubmitButton } from "@core/components/form/FieldSubmitButton"
import { createFormHook } from "@tanstack/react-form"
import { fieldContext, formContext } from "@core/hd"
import { useAuth } from "@core/hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import { useApi } from "@core/hooks/useApi"

export const ProfileInfo = () => {
  const { auth, api } = useApi()
  const mutation = useMutation(api.users.update.mutationOptions({
    onSuccess: ({ data }) => {
      console.log('data', data)
      // auth.setUser(data.data)
    }
  }))
  const { useAppForm } = createFormHook({
    fieldComponents: {
      FieldInput,
    },
    formComponents: {
      FieldSubmitButton
    },
    fieldContext,
    formContext
  })

  const form = useAppForm({
    defaultValues: auth.user,
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
      <form.AppField name="nickname" children={field => <field.FieldInput label="昵称" />} />
      <form.AppField name="realName" children={field => <field.FieldInput label="真实姓名" />} />
      <form.AppField name="home" children={field => <field.FieldInput label="个人网站" />} />
      <form.AppField name="github" children={field => <field.FieldInput label="Github 账号" />} />
      <form.AppField name="qq" children={field => <field.FieldInput label="QQ 账号" />} />
      <form.AppField name="weibo" children={field => <field.FieldInput label="微博账号" />} />
      <form.AppField name="wechat" children={field => <field.FieldInput label="微信账号" />} />
      <form.AppField name="address" children={field => <field.FieldInput label="地址" />} />
      <form.AppForm>
        <form.FieldSubmitButton className="flex justify-start" />
      </form.AppForm>
    </form>
  )
}
