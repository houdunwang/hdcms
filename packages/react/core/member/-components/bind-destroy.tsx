import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useApi } from "@houdunyun/react/hooks"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

export const BindDestroy = () => {
  const { api, auth } = useApi()
  const [isConfirm, setIsConfirm] = useState(false)
  const mutation = useMutation(api.users.destroy.mutationOptions({
    onSuccess: () => {
      auth.logout()
    }
  }))

  // onClick={() => mutation.mutate({})}
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}> 注销帐号 </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>确定要注销吗？</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="mb-3">
              注销后将无法恢复，请谨慎操作。 <br />
              如果确定注销！请在下面输入内容 <span className="text-primary">我确定注销帐号</span>
            </div>
            <Input onPaste={(e) => {
              e.preventDefault()
            }} onChange={(e) => {
              setIsConfirm(e.target.value === '我确定注销帐号')
            }} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>取消</AlertDialogCancel>
          <Button disabled={!isConfirm} onClick={() => {
            if (!isConfirm) return
            mutation.mutate({})
          }} variant={isConfirm ? 'destructive' : 'outline'}>确定</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    // <ConfirmDialog
    //   title="注销帐号"
    //   description="确定注销当前帐号吗？"
    //   submitButton={secondConfitm}
    // >
    //   <Button variant={'outline'}>
    //     注销帐号
    //   </Button>
    // </ConfirmDialog>
  )
}
