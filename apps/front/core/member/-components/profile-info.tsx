import { hdCreateFormHook, useApi, useAuth } from "#core/hooks"
import { useMutation } from "@tanstack/react-query"
import { User } from "lucide-react"
import { toast } from "sonner"

export const ProfileInfo = (): React.JSX.Element => {
  const api = useApi()
  const auth = useAuth()
  const mutation = useMutation(api.users.update.mutationOptions({
  }))
  const { useAppForm } = hdCreateFormHook()

  const form = useAppForm({
    defaultValues: auth.user,
    onSubmit: async ({ value: body }) => {
      const { data } = await mutation.mutateAsync({ params: { id: auth.user!.id }, body })
      auth.setUser(data)
      toast.success('更新成功')
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
      <form.AppField name="sex" children={field => <field.FieldRadioGroup label="性别" options={[
        { label: '男', value: '1' },
        { label: '女', value: '0' },
      ]} />} />
      <form.AppForm>
        <form.FieldSubmitButton className="flex justify-start" />
      </form.AppForm>
    </form>
  )
}
