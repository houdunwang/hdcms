import { FieldImage } from "@core/components/form/FieldImage"
import { fieldContext, formContext } from "@core/hd"
import { useApi } from "@core/hooks/useApi"
import { userAtom } from "@core/store/userStore"
import { createFormHook } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"

export const ProfileAvatar = () => {
  const { auth, api } = useApi()
  const setUser = useSetAtom(userAtom)
  const mutation = useMutation(api.users.update.mutationOptions({
    onSuccess: ({ data }) => {
      setUser(data)
    }
  }))
  const { useAppForm } = createFormHook({
    fieldComponents: {
      FieldImage
    },
    formComponents: {},
    fieldContext,
    formContext
  })

  const form = useAppForm({
    defaultValues: {
      avatar: auth.user?.avatar || ''
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
      <form.AppField name="avatar" children={field => <field.FieldImage label="头像" onSuccess={url => {
        mutation.mutateAsync({ body: { avatar: url } })
      }} />} />
    </form>
  )
}
