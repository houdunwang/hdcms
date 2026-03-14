import { Button } from "@/components/ui/button"
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty"
import { Link } from "@tanstack/react-router"
import { BellRing } from "lucide-react"
import type { JSX } from "react"

export const E404 = (): JSX.Element => {
	return (
		<div className="flex h-screen items-center justify-center">
			<Empty>
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<BellRing />
					</EmptyMedia>
					<EmptyTitle>404!</EmptyTitle>
					<EmptyDescription>
						你访问的页面不存在或已被移除。
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent className="flex-row justify-center gap-2">
					<Link to='/'>
						<Button>返回首页</Button>
					</Link>
				</EmptyContent>
			</Empty>
		</div>
	)
}
