import { Alert } from "@/components/ui/alert"
import { WechatQrCode } from "@hd/react/components"
import { useApi } from "@hd/react/hooks"
import { useMutation } from "@tanstack/react-query"
import { CheckCircle2Icon } from "lucide-react"

export const BindWechat = () => {
  const { auth, api } = useApi()
  const mutation = useMutation(api.wechatBind.bind.mutationOptions())
  return (
    <div className="flex items-start flex-col">
      {auth.user?.openid && <Alert className="mb-4">
        <CheckCircle2Icon />你已经绑定过微信，扫码下方二维码可以重新绑定
      </Alert>}
      <WechatQrCode
        className="flex items-start"
        scene_str="bind" onSuccess={async (ticket) => {
          const res = await mutation.mutateAsync({ body: { ticket } })
          if (res?.data?.data?.status == 'success') {
            auth.setUser(res.data.data.user)
            return 'success';
          }
          if (res?.data?.data?.status == 'exist') {
            return 'exist';
          }
        }} />
    </div>
  )
}
