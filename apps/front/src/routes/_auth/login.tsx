import { Login } from '@core/components/auth/Login'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_auth/login')({
	component: Page
})

function Page() {
	return <Login />
}

