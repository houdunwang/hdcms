import { ChartBar } from "#core/common/ChartBar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { type ChartConfig } from "@/components/ui/chart"
import { dasbardStore } from "#core/store/dasbardStore"
import { useAtomValue } from "jotai"
import * as React from "react"

export function Sales(): React.JSX.Element {
	const dasbardData = useAtomValue(dasbardStore)
	const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("amount")
	const chartConfig = {
		amount: {
			label: "销售额",
			color: "#2563eb",
		},
		count: {
			label: "订单量",
			color: "#7158e2",
		},
	} satisfies ChartConfig
	const total = React.useMemo(
		() => ({
			amount: dasbardData?.orderMonths.reduce((acc: number, curr: { amount: number }) => acc + curr.amount, 0),
			count: dasbardData?.orderMonths.reduce((acc: number, curr: { count: number }) => acc + curr.count, 0),
		}),
		[]
	)
	return (
		<Card className="py-0">
			<CardHeader className="flex flex-col items-stretch border-b p-0! sm:flex-row">
				<div className="flex flex-1 flex-col justify-center gap-1 px-6 pt-4 pb-3">
					<CardTitle>销售统计</CardTitle>
					<CardDescription>
						12个月销售额与订单数量统计
					</CardDescription>
				</div>
				<div className="flex">
					{["amount", "count"].map((key) => {
						const chart = key as keyof typeof chartConfig
						return (
							<button
								key={chart}
								data-active={activeChart === chart}
								className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
								onClick={() => setActiveChart(chart)}
							>
								<span className="text-xs text-muted-foreground">
									{chartConfig[chart].label}
								</span>
								<span className="text-lg leading-none font-bold sm:text-3xl">
									{total[key as keyof typeof total]}
								</span>
							</button>
						)
					})}
				</div>
			</CardHeader>
			<CardContent className="px-2 sm:p-6">
				<ChartBar
					data={dasbardData?.orderMonths}
					chartConfig={{ [activeChart]: chartConfig[activeChart] }}
				/>
			</CardContent>
		</Card>
	)
}
