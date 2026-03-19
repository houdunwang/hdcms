import { TooltipProvider } from '@/components/ui/tooltip'
import { useInit } from '#core/hooks/useInit'
import { QueryClientProvider, type QueryClient } from '@tanstack/react-query'
import { RouterProvider, type AnyRouter } from '@tanstack/react-router'
import { HashLoader } from 'react-spinners'
import { Toaster } from "sonner"
import { RouteProgressBar } from '../common'
import { useAuth } from '../hooks/useAuth'
import '../plugin/dayjs'
import { ThemeProvider } from '../theme/theme-provider'

export const HdProvider = ({ router, queryClient }: { router: AnyRouter, queryClient: QueryClient }): React.JSX.Element => {
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
	const isLoading = useInit()
	if (isLoading) return <div className='w-screen h-screen flex justify-center items-center'><HashLoader size={50} color='#fb2c36' /></div>
	return <>
		<RouteProgressBar router={router} />
		<RouterProvider router={router} context={{ auth, queryClient }} />
	</>
}
