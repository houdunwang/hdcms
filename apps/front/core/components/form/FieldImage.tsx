import { cn } from "@/lib/utils"
import { useFieldContext } from "@core/hd"
import { useApi } from "@core/hooks/useApi"
import { useMutation } from "@tanstack/react-query"
import type { FormFieldProps } from "core/types/form"
import { useDropzone } from 'react-dropzone'

interface Props extends FormFieldProps<'input'> {
	onSuccess: (url: string) => void
}
export function FieldImage({ onSuccess, label, description, className, fieldClassName, type, ...props }: Props) {
	const field = useFieldContext<string>()
	const { api } = useApi()
	const mutation = useMutation(api.uploads.imageSingle.mutationOptions({
		onSuccess: ({ data }) => {
			field.setValue(data.url)
			onSuccess(data.url)
		},
		onError: (error) => {
			console.log('error', error)
		},
	}))
	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'image/*': [] },
		maxFiles: 2,
		maxSize: 1024 * 1024 * 2,
		multiple: true,
		onDrop: files => {
			const file = files[0]
			if (file) mutation.mutate({ body: { file } } as any)
		}
	});
	if (field.state.value) return <div {...getRootProps({ className: 'dropzone' })}>
		<input {...getInputProps()} />
		<img src={field.state.value}
			className={cn('group-hover:scale-105 duration-300 object-cover h-32 rounded-lg cursor-pointer', fieldClassName)} />
	</div>
	// const files = <li className="border rounded-lg overflow-hidden group relative object-cover">
	// 	<img src={field.state.value} className="group-hover:scale-105 duration-300 object-cover h-32" />
	// 	<div className="absolute right-3 top-3 bg-background rounded-sm p-1 cursor-pointer opacity-0 group-hover:opacity-100 duration-200 hover:scale-125">
	// 		<Trash className="text-foreground" size={16} />
	// 	</div>
	// </li>
	// const files = acceptedFiles.map(file => (
	// 	<li key={file.path} className="border rounded-lg overflow-hidden group relative object-cover">
	// 		<img src={URL.createObjectURL(file)} alt={file.name} className="group-hover:scale-105 duration-300 object-cover h-32" />
	// 		<div className="absolute right-3 top-3 bg-background rounded-sm p-1 cursor-pointer opacity-0 group-hover:opacity-100 duration-200 hover:scale-125">
	// 			<Trash className="text-foreground" size={16} />
	// 		</div>
	// 	</li>
	// ));
	// return (
	// 	<section className="container">
	// 		{field.state.value}
	// 		<div {...getRootProps({ className: 'dropzone' })} className="w-64">
	// 			<input {...getInputProps()} />
	// 			<div className="text-sm text-gray-500 border py-6 px-6 rounded-lg flex flex-col justify-center items-center gap-3 cursor-pointer hover:border-primary/10 duration-200">
	// 				<Upload />
	// 				拖放图片或单击选择
	// 			</div>
	// 		</div>
	// 		<aside className="mt-3">
	// 			<ul className="flex gap-3 justify-start">{files}</ul>
	// 		</aside>
	// 		<FieldValidateError field={field} />
	// 	</section>
	// )
	// return (
	// 	<Field className={className}>
	// 		{label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
	// 		<Input
	// 			id={field.name}
	// 			name={field.name}
	// 			type={type ?? 'file'}
	// 			onBlur={field.handleBlur}
	// 			onChange={(event) => {
	// 				const file = (event.target as HTMLInputElement).files?.[0] ?? null
	// 				console.log('file', file)
	// 				field.handleChange(file)
	// 			}}
	// 			className={cn(fieldClassName)}
	// 			{...props}
	// 			autoComplete={autoComplete}
	// 		/>
	// 		<FieldValidateError field={field} />
	// 	</Field>
	// )
}
