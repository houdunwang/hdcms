import type { JSX, JSXElementConstructor } from "react"

export type FormFieldProps<T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any>> = Omit<
	React.ComponentProps<T>,
	"name" | "value" | "onChange" | "onBlur" | "id"
> & {
	label?: React.ReactNode
	description?: React.ReactNode
	className?: string
	fieldClassName?: string
}

export type IFieldApi = {
	name: string
	state: {
		meta?: {
			errors: readonly unknown[]
		}
	}
}