import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from '@/theme/theme-provider'
import { AuthEnum } from '@/types/enum'
import '@/plugin/dayjs'
import { userAtom } from '@/store/userStore'
import { QueryClientProvider, useQuery, type QueryClient } from '@tanstack/react-query'
import { RouterProvider, type AnyRouter } from '@tanstack/react-router'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { HashLoader } from 'react-spinners'
import { Toaster } from "sonner"
import { useApi } from '@/hooks/useApi'
import { useAuth } from '@/hooks/useAuth'

export const config = {
	baseUrl: ''
}
export const HdProvider = ({ router, queryClient, baseUrl }: { router: AnyRouter, queryClient: QueryClient, baseUrl: string }): React.JSX.Element => {
	config.baseUrl = baseUrl
	return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
		<QueryClientProvider client={queryClient}>
			<TooltipProvider >
				<App router={router} queryClient={queryClient} />
			</TooltipProvider>
			<Toaster position='top-center' className='text-primary' />
		</QueryClientProvider>
	</ThemeProvider>
}

function App({ router, queryClient }: { router: AnyRouter, queryClient: QueryClient }) {
	const auth = useAuth()
	const { api } = useApi()
	const setUser = useSetAtom(userAtom)
	const { isLoading, data } = useQuery(api.users.profile.queryOptions({},
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
