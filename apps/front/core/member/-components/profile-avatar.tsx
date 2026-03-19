import { FieldImage } from "#core/form"
import { fieldContext, formContext } from "#core/form"
import { useApi, useAuth } from "#core/hooks"
import { userAtom } from "#core/store"
import { createFormHook } from "@tanstack/react-form"
import { useMutation } from "@tanstack/react-query"
import { useSetAtom } from "jotai"

export const ProfileAvatar = (): React.JSX.Element => {
  const api = useApi()
  const auth = useAuth()
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
  })
  return (
    <form autoComplete="off"
      className="space-y-3"
      onSubmit={e => {
        e.preventDefault()
        void form.handleSubmit()
      }} >
      <form.AppField
        name="avatar"
        children={field => <field.FieldImage label="头像"
          onSuccess={url => {
            mutation.mutateAsync({ body: { avatar: url } })
          }} />}
      />
    </form>
  )
}
