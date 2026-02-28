import { ThemeProvider } from '@core/components/theme/theme-provider'
import { AuthEnum } from '@core/enum'
import { userAtom } from '@core/store/userStore'
import { QueryClientProvider, useQuery, type QueryClient } from '@tanstack/react-query'
import { RouterProvider, type AnyRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { HashLoader } from 'react-spinners'
import { Toaster } from "sonner"
import './plugin/dayjs'
import { useAuth } from './hooks/useAuth'
import { useApi } from './hooks/useApi'
import { createFormHookContexts } from '@tanstack/react-form'
import { useEffect } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'

export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

export const Hd = ({ router, queryClient }: { router: AnyRouter, queryClient: QueryClient }) => {
	return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<QueryClientProvider client={queryClient}>
			<TooltipProvider>
				<HdProvider router={router} queryClient={queryClient} />
			</TooltipProvider>
			<Toaster position='top-center' />
		</QueryClientProvider>
	</ThemeProvider>
}

function HdProvider({ router, queryClient }: { router: AnyRouter, queryClient: QueryClient }) {
	const auth = useAuth()
	const { api } = useApi()
	const setUser = useSetAtom(userAtom)
	const { isLoading, data } = useQuery(api.users.me.queryOptions({},
		{ enabled: !!localStorage.getItem(AuthEnum.TOKEN_NAME) })
	)

	useEffect(() => {
		if (data?.data) {
			setUser(data.data)
		}
	}, [data])

	if (isLoading) return <div className='w-screen h-screen flex justify-center items-center'><HashLoader size={50} color='#fb2c36' /></div>
	return <RouterProvider router={router} context={{ auth, queryClient }} />
}
