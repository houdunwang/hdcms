import { Alert } from "@/components/ui/alert"
import { hdCreateFormHook, useAuth } from "#core/hooks"
import { useApi } from "#core/hooks"
import { useMutation } from "@tanstack/react-query"
import { CheckCircle2Icon } from "lucide-react"
import z from "zod"

export const BindEmail = (): React.JSX.Element => {
  const api = useApi()
  const auth = useAuth()
  const mutation = useMutation(api.binds.email.mutationOptions())
  const { useAppForm } = hdCreateFormHook()

  const form = useAppForm({
    defaultValues: {
      email: '',
      code: ''
    },
    validators: {
      onSubmit: z.object({
        email: z.string().email('请输入正确的邮箱'),
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
      {auth.user?.email && <Alert className="mb-4">
        <CheckCircle2Icon />你已经绑定邮箱 {auth.user.email}
      </Alert>}
      <div className="flex items-start flex-col space-y-3">
        <form.AppField name='code'
          children={field => <field.FieldCode type='email' label="发送验证码" className="w-full" placeholder="请输入绑定的邮箱" />}
        />
        <form.AppForm>
          <form.FieldSubmitButton label="绑定邮箱" />
        </form.AppForm>
      </div>
    </form>
  )
}
