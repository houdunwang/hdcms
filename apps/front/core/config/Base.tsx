import { Loading } from '#core/common'
import { hdCreateFormHook, useApi } from '#core/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, type FC } from 'react'

export const Base: FC = () => {
	const { useAppForm } = hdCreateFormHook()
	const api = useApi()
	const { isLoading, data } = useQuery(api.configs.all.queryOptions())
	const mutation = useMutation(api.configs.store.mutationOptions())
	const form = useAppForm({
		defaultValues: {},
		onSubmit: async ({ value: body }) => {
			await mutation.mutateAsync({ body })
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

			<form.AppField name="site_close" children={field => <field.FieldSwitch label="开启维护" />} />
			<form.AppField name="site_close_description" children={field => <field.FieldTextarea label="网站维护说明" />} />
			<form.AppForm>
				<form.FieldSubmitButton type="submit" label="保存提交" />
			</form.AppForm>
		</form>
	)
}
