import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "../components/ui/chart"
import { cn } from "../components/lib/utils"
import type { JSX } from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

type Props = {
	data?: Record<string, any>[]
	dateKey?: 'day' | 'month' | 'year'
	chartConfig: ChartConfig
	className?: string
}
export const ChartBar = ({ data, chartConfig, className, dateKey = 'month' }: Props): JSX.Element => {
	if (!data?.length) return <div>暂无数据</div>
	return (
		<ChartContainer config={chartConfig} className={cn("aspect-auto h-[250px] w-full", className)}>
			<BarChart accessibilityLayer data={data}>
				<CartesianGrid vertical={false} />
				<XAxis dataKey={dateKey} tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => value} />
				<ChartTooltip content={<ChartTooltipContent />} />
				{
					Object.keys(chartConfig).map((key) => (
						<Bar key={key} dataKey={key} fill={`var(--color-${key})`} radius={4} />
					))
				}
			</BarChart>
		</ChartContainer>
	)
}
