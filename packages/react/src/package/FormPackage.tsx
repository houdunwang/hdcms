import { Loading } from '../common';
import { hdCreateFormHook, useApi } from '../hooks';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, type FC } from 'react';
import { toast } from 'sonner';
import z from 'zod';

export const FormPackage: FC<{ id?: number, closeDialog: () => void; }> = ({ id = 0, closeDialog }) => {
	const { api } = useApi()
	const queryClient = useQueryClient()
	const { isLoading, data } = useQuery(api.package.show.queryOptions({ params: { id } }, { enabled: !!id }))
	const updateMutation = useMutation(api.package.update.mutationOptions())
	const storeMutation = useMutation(api.package.store.mutationOptions())
	const { useAppForm } = hdCreateFormHook()
	const formSchema = z.object({
		title: z.string({ required_error: '请输入套餐名称' }),
		ad: z.string({ required_error: '请输入广告语' }),
		state: z.coerce.boolean({ required_error: '请选择是否启用' }).transform((val) => typeof val === 'boolean' ? val : true),
		months: z.preprocess((val) => (val ?? 0), z.coerce.number({ required_error: '请输入可用月数' }).positive('请输入大于0的月数')),
		price: z.preprocess((val) => val ?? 0, z.coerce.number({ required_error: '请输入价格' }).positive('请输入大于0的价格')),
		originalPrice: z.preprocess((val) => val ?? 0, z.coerce.number({ required_error: '请输入价格' }).positive('请输入大于0的原价格')),
		feature: z.string({ required_error: '请输入套餐特征' }),
	})
	const form = useAppForm({
		defaultValues: {} as z.infer<typeof formSchema>,
		validators: {
			onChange: formSchema as any,
			onSubmit: formSchema as any,
		},
		onSubmit: async ({ value: body }) => {
			const data = formSchema.parse(body)
			if (id) {
				await updateMutation.mutateAsync({ params: { id }, body: data })
			} else {
				await storeMutation.mutateAsync({ body: data })
			}
			toast.success(id ? '套餐更新成功' : '套餐创建成功')
			await queryClient.invalidateQueries({ queryKey: api.package.index.queryOptions().queryKey })
			closeDialog()
		},
	})

	useEffect(() => {
		if (data?.data) {
			form.reset(data.data)
		}
	}, [data?.data])
	if (isLoading) return <Loading />
	return (
		<form.AppForm>
			<form onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit()
			}} className="space-y-4 pt-4">
				<form.AppField name="title" children={(field) => <field.FieldInput label="套餐名称" />} />
				<form.AppField name="ad" children={(field) => <field.FieldInput label="广告语" />} />
				<form.AppField name="months" children={(field) => <field.FieldInput type="number" label="可用月数" />} />
				<form.AppField name="state" children={(field) => <field.FieldSwitch label="是否启用" />} />
				<form.AppField name="price" children={(field) => <field.FieldInput type="number" label="价格" />} />
				<form.AppField name="originalPrice" children={(field) => <field.FieldInput type="number" label="原价格" />} />
				<form.AppField name="feature" children={(field) => <field.FieldTextarea label="套餐福利" description="每行一个套餐福利" />} />
				<form.FieldSubmitButton />
			</form>
		</form.AppForm>
	)
}
