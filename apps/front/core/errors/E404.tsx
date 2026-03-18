import React, { type JSX } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card"
import { Button } from "../components/ui/button"
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "../components/ui/empty"
import { Info, RefreshCcwIcon } from "lucide-react"
export const E404 = (): JSX.Element => {
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
						<EmptyTitle>你访问的页面不存在</EmptyTitle>
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
