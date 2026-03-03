import { cn } from "@/lib/utils"
import { useFieldContext } from "@core/hd"
import { useApi } from "@core/hooks/useApi"
import { fieldErrorAtom } from "@core/store/fieldErrorStore"
import { useMutation } from "@tanstack/react-query"
import type { FormFieldProps } from "core/types/form"
import { useSetAtom } from "jotai"
import { useDropzone } from 'react-dropzone'
import { FieldValidateError } from "./FieldValidateError"
import { ImageUp } from "lucide-react"

interface Props extends FormFieldProps<'input'> {
	onSuccess: (url: string) => void
	maxSize?: number,
}
export function FieldImage({ onSuccess, maxSize, fieldClassName }: Props) {
	const field = useFieldContext<string>()
	const { api } = useApi()
	const setFieldError = useSetAtom(fieldErrorAtom)

	const mutation = useMutation(api.uploads.imageSingle.mutationOptions({
		onSuccess: ({ data }) => {
			field.setValue(data.url)
			onSuccess(data.url)
		},
		onError: (error) => {
			const message = error.response?.errors[0].message
			if (message) {
				setFieldError(state => ({
					...state,
					[field.name]: message,
				}))
			}
		},
	}))
	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'image/*': [] },
		maxFiles: 1,
		maxSize: 1024 * 1024 * (maxSize ?? 2),
		multiple: false,
		onDrop: files => {
			const file = files[0]
			if (file) mutation.mutate({ body: { file } } as any)
		}
	});
	return <div className="flex justify-start">
		<input {...getInputProps()} />
		<div  {...getRootProps({ className: 'dropzone  p-3 rounded-lg cursor-pointer' })}>
			{field.state.value ?
				<img src={field.state.value}
					className={cn('group-hover:scale-105 duration-300 object-cover h-32 rounded-lg cursor-pointer', fieldClassName)} />
				: <div className="flex flex-col items-center justify-center border p-3 rounded-lg hover:border-primary/30 duration-200">
					<ImageUp size={70} strokeWidth={1} className="cursor-pointer" />
					<div className="text-muted-foreground text-sm mt-2">拖放图片或单击选择</div>
				</div>
			}
		</div>
		{/* <img src={field.state.value}
			{...getRootProps({ className: 'dropzone' })}
			className={cn('group-hover:scale-105 duration-300 object-cover h-32 rounded-lg cursor-pointer', fieldClassName)} /> */}
		<FieldValidateError field={field} className="mt-2" />
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
