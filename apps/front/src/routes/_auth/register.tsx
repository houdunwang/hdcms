import { Register } from '@core/components/auth/Register'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/_auth/register')({
	component: Page
})

function Page() {
	return <Register />
}

