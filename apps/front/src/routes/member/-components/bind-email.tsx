import { hdCreateFormHook } from "@core/hooks/hdCreateFormHook"
import { useApi } from "@core/hooks/useApi"
import { useMutation } from "@tanstack/react-query"
import z from "zod"

export const BindEmail = () => {
  const { auth, api } = useApi()
  const mutation = useMutation(api.binds.email.mutationOptions())
  const { useAppForm } = hdCreateFormHook()

  const form = useAppForm({
    defaultValues: {
      account: '',
      code: ''
    },
    validators: {
      onSubmit: z.object({
        account: z.string().min(1, '请输入账号'),
        code: z.string().min(1, '请输入验证码')
      })
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({ body: value })
    }
  })

  return (
    <form autoComplete="off" onSubmit={e => {
      e.preventDefault()
      void form.handleSubmit()
    }} >
      <div className="flex items-start flex-col space-y-3">
        <form.AppField name='code'
          children={field => <field.FieldCode label="发送验证码" className="w-full" placeholder="请输入绑定的邮箱" />}
        />
        <form.AppForm>
          <form.FieldSubmitButton label="绑定邮箱" />
        </form.AppForm>
      </div>
    </form>
  )
}
