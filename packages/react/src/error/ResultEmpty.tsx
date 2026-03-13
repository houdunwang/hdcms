import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card"
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from "@/components/ui/empty"
import { Info, RefreshCcwIcon } from "lucide-react"
import { type JSX } from 'react'
export const ResultEmpty = (): JSX.Element => {
	return (
		<Card>
			<CardHeader>
				<CardTitle></CardTitle>
				<CardDescription></CardDescription>
			</CardHeader>
			<CardContent>
				<Empty className="h-full bg-muted/30">
					<EmptyHeader>
						<Info size={25} />
						<EmptyTitle>没有结果</EmptyTitle>
						<EmptyDescription className="max-w-xs text-pretty">
							{/* You&apos;re all caught up. New notifications will appear here. */}
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<Button variant="outline" onClick={() => window.location.reload()}>
							<RefreshCcwIcon />
							刷新
						</Button>
					</EmptyContent>
				</Empty>
			</CardContent>
		</Card>
	)
}
