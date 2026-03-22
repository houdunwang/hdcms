import { Loading } from '#core/common'
import { hdCreateFormHook, useApi } from '#core/hooks'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "@/components/ui/tabs"
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState, type FC } from 'react'
import { toast } from 'sonner'
import { Base } from './Base'
import { Email } from './Email'
import { Sms } from './Sms'

const configs = {
	base: Base,
	// aliyun: <Aliyun />,
	// wepay: <WePay />,
	email: Email,
	// sms: <Sms />,
	// wechat: <Wechat />,
	// upload: <Upload />
}
export const ConfigAdminPage: FC = () => {
	const [value, setValue] = useState('sms')
	const { useAppForm } = hdCreateFormHook()
	const api = useApi()
	const { isLoading, data } = useQuery(api.configs.all.queryOptions())
	const mutation = useMutation(api.configs.store.mutationOptions())
	const form = useAppForm({
		defaultValues: {},
		onSubmit: async ({ value: body }) => {
			await mutation.mutateAsync({ body })
			toast.success('保存成功')
		}
	})
	useEffect(() => {
		if (data?.data) {
			const getConfig = (name: string) => data.data.find(config => config.name === name)
			form.reset({
				site_close: Boolean(getConfig('site_close')?.value == '1'),
				site_close_description: getConfig('site_close_description')?.value
			})
		}
	}, [data?.data])
	if (isLoading) return <Loading />
	return (
		<form autoComplete='off' onSubmit={e => {
			e.preventDefault()
			e.stopPropagation()
			void form.handleSubmit()
		}}>
			<Tabs value={value} onValueChange={setValue}>
				<TabsList>
					<TabsTrigger value="base" >基本配置</TabsTrigger>
					<TabsTrigger value="email">邮件发送</TabsTrigger>
					<TabsTrigger value="sms">手机短信</TabsTrigger>
					{/* <TabsTrigger value="aliyun" >阿里云</TabsTrigger>
				<TabsTrigger value="wepay">微信支付</TabsTrigger>
				<TabsTrigger value="wechat">微信公众号</TabsTrigger>
				<TabsTrigger value="upload">文件上传</TabsTrigger> */}
				</TabsList>
				<TabsContent value='base' forceMount hidden={value !== 'base'}>
					<Base form={form} />
				</TabsContent>
				<TabsContent value='email' forceMount hidden={value !== 'email'}>
					<Email form={form} />
				</TabsContent>
				<TabsContent value='sms' forceMount hidden={value !== 'sms'}>
					<Sms form={form} />
				</TabsContent>
			</Tabs>
		</form>
	)
}
