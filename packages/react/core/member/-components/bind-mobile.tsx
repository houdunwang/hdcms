import { Alert } from "@/components/ui/alert"
import { hdCreateFormHook, useApi } from "@core/hooks"
import { useMutation } from "@tanstack/react-query"
import { CheckCircle2Icon } from "lucide-react"

export const BindMobile = () => {
  const { api, auth } = useApi()
  const mutation = useMutation(api.binds.mobile.mutationOptions())
  const { useAppForm } = hdCreateFormHook()

  const form = useAppForm({
    defaultValues: {
      mobile: '',
      code: ''
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync({ body: value })
    }
  })

  return (
    <form autoComplete="off" onSubmit={e => {
      e.preventDefault()
      void form.handleSubmit()
    }}>
      {auth.user?.mobile && <Alert className="mb-4">
        <CheckCircle2Icon />你已经绑定手机号 {auth.user.mobile.substring(0, 3) + '****' + auth.user.mobile.substring(7)}
      </Alert>}
      <div className="flex items-start flex-col space-y-3">
        <form.AppField name='code'
          children={field => <field.FieldCode type='mobile' label="发送验证码" className="w-full" placeholder="请输入绑定的邮箱" />}
        />
        <form.AppForm>
          <form.FieldSubmitButton label="绑定手机" />
        </form.AppForm>
      </div>
    </form>
  )
}
