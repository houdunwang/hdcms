import { Forget } from '@hd/react/components'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/auth/forget')({
	component: Page
})

function Page() {
	return <Forget />;
}

