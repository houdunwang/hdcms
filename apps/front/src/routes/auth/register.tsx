import { Register } from '@hd/react/components'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/auth/register')({
	component: Page
})

function Page() {
	return <Register />
}

