import { cn } from "@/lib/utils"
import { useFieldContext } from "@/index"
import { useApi } from "@core/hooks/useApi"
import { fieldErrorAtom } from "@core/store/fieldErrorStore"
import { useMutation } from "@tanstack/react-query"
import type { FormFieldProps } from "@core/form/types"
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
		<FieldValidateError field={field} className="mt-2" />
	</div>
}
