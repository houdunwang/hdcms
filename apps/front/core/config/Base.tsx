import type { FC } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
export const Base: FC<{ form: any }> = ({ form }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>基础配置</CardTitle>
				<CardDescription>网站运行基本配置</CardDescription>
			</CardHeader>
			<CardContent>
				<form.AppField name="site_close" children={(field: any) => <field.FieldSwitch label="开启维护" />} />
				<form.AppField name="site_close_description" children={(field: any) => <field.FieldTextarea label="网站维护说明" />} />
				<form.AppForm>
					<form.FieldSubmitButton type="submit" label="保存提交" />
				</form.AppForm>
			</CardContent>
		</Card>
	)
}
