import { hdCreateFormHook, useApi, useAuth } from "#core/hooks"
import { userAtom } from "#core/store"
import { UserIcon } from "#core/user/UserIcon.tsx"
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
  const { useAppForm } = hdCreateFormHook()

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
        children={field =>
          <field.FieldImage
            label="头像"
            fallback={<UserIcon user={auth.user!} className="rounded-sm" />}
            onSuccess={url =>
              mutation.mutateAsync({
                params: { id: auth.user!.id },
                body: { avatar: url }
              })
            } />
        }
      />
    </form>
  )
}
