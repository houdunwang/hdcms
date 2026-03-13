import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fieldContext, FieldInput, FieldSubmitButton, formContext } from "@/form"
import { FieldSelect } from "@/form/FieldSelect"
import { cn } from "@/lib/utils"
import { createFormHook } from "@tanstack/react-form"
import { useNavigate, useRouterState } from "@tanstack/react-router"
import { type FC } from 'react'

type Props = {
	className?: string,
	options: {
		label: string,
		value: string,
	}[],
}
export const SearchBlock: FC<Props> = ({ className, options }) => {
	const location = useRouterState({ select: s => s.location })
	const navigate = useNavigate()
	const { useAppForm } = createFormHook({
		fieldComponents: {
			FieldInput,
			FieldSelect
		},
		formComponents: {
			FieldSubmitButton
		},
		fieldContext,
		formContext,
	})
	const form = useAppForm({
		defaultValues: {
			field: options[0].value as any,
			keyword: location.search.keyword || ''
		},
		onSubmit: async ({ value: body }) => {
			navigate({ to: location.pathname, search: { ...location.search, ...body, page: 1 } })
		}
	})
	return (
		<form autoComplete="off" onSubmit={e => {
			e.preventDefault()
			void form.handleSubmit()
		}} >
			<Card className={cn('', className)}>
				<CardHeader>
					<CardTitle>搜索</CardTitle>
					<CardDescription></CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex gap-2">
						<form.AppField name='field' children={field => <field.FieldSelect
							className="flex-0"
							defaultValue={options[0].value}
							options={options} fieldClassName="h-full" placeholder="搜索字段" />} />
						<form.AppField name='keyword' children={field =>
							<field.FieldInput className="flex-1" fieldClassName="" placeholder="搜索关键词" />}
						/>
						<form.AppForm>
							<form.FieldSubmitButton label='搜索' size={'default'} variant={'outline'} />
						</form.AppForm>
					</div>
				</CardContent>
			</Card>
		</form>
	)
}
