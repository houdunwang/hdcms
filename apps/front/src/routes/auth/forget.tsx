import { Forget } from '@core/components/login/Forget'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/auth/forget')({
	component: Page
})

function Page() {
	return <Forget />;
}

