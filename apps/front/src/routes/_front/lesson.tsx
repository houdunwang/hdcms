import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { HdPagination } from '@houdunyun/ui'
import { createFileRoute } from '@tanstack/react-router'
import { ArrowRight, BadgeCheck, Lock } from 'lucide-react'
import { useMemo, useState } from 'react'
export const Route = createFileRoute('/_front/lesson')({
	component: LessonPage,
})

export function LessonPage() {
	const tags = [
		'全部课程',
		'系统课程',
		'实战项目',
		'开发环境',
		'Electron',
		'React',
		'Vue',
		'Javascript/Css',
		'Laravel/PHP',
	] as const

	const courses = [
		{
			title: 'Vue3 + TypeScript 实战',
			desc: '以真实业务驱动学习，覆盖组件、路由、状态与工程化流程。',
			category: '前端开发',
			level: '进阶',
			lessons: 46,
			duration: '28 小时',
			updated: '2 周前更新',
			badge: '热门',
			cover: 'Vue3',
			tags: ['实战项目', 'Vue', 'Javascript/Css'],
			chapters: ['Vue3 核心语法', '组件通信与状态', '路由与权限', '工程化与部署'],
		},
		{
			title: 'React 全家桶与工程实践',
			desc: '从组件设计到性能优化，建立可扩展的前端架构能力。',
			category: '前端开发',
			level: '进阶',
			lessons: 52,
			duration: '32 小时',
			updated: '1 周前更新',
			badge: '更新',
			cover: 'React',
			tags: ['系统课程', 'React', 'Javascript/Css'],
			chapters: ['组件设计与状态管理', '路由与数据流', '性能优化', '工程化实践'],
		},
		{
			title: 'Node / NestJS API 开发',
			desc: '构建可上线的 API 服务：鉴权、日志、异常与规范化结构。',
			category: '后端开发',
			level: '进阶',
			lessons: 40,
			duration: '24 小时',
			updated: '3 周前更新',
			badge: '实战',
			cover: 'Nest',
			tags: ['实战项目', '开发环境'],
			chapters: ['项目结构与模块化', '鉴权与权限', '日志与异常', '部署与监控'],
		},
		{
			title: 'PHP / Laravel 系统课程',
			desc: '从框架基础到项目实战，掌握开发、测试与部署的完整流程。',
			category: '后端开发',
			level: '系统课',
			lessons: 60,
			duration: '36 小时',
			updated: '1 个月前更新',
			badge: '系统课',
			cover: 'Laravel',
			tags: ['系统课程', 'Laravel/PHP'],
			chapters: ['路由与控制器', 'Eloquent 数据模型', '测试与调试', '部署与优化'],
		},
		{
			title: '全栈项目：在线学习平台',
			desc: '串联前后端与部署流程，完整交付一套可上线的产品。',
			category: '全栈应用',
			level: '高级',
			lessons: 58,
			duration: '40 小时',
			updated: '5 天前更新',
			badge: '进阶',
			cover: '全栈',
			tags: ['实战项目', '开发环境'],
			chapters: ['需求拆解与架构', '后端接口实现', '前端业务流程', '上线与运维'],
		},
		{
			title: '工程化与性能优化',
			desc: '构建统一规范与流程，解决打包、监控与性能瓶颈。',
			category: '工程化',
			level: '高级',
			lessons: 34,
			duration: '18 小时',
			updated: '2 周前更新',
			badge: '专项',
			cover: '工程化',
			tags: ['开发环境', 'Javascript/Css'],
			chapters: ['构建与打包策略', '性能指标分析', '监控与告警', '自动化流程'],
		},
	]

	const [activeTag, setActiveTag] = useState<(typeof tags)[number]>('全部课程')
	const filteredCourses = useMemo(() => {
		if (activeTag === '全部课程') {
			return courses
		}
		return courses.filter((course) => course.tags.includes(activeTag))
	}, [activeTag, courses])

	const memberHighlights = [
		{
			title: '课程全量解锁',
			desc: '系统课与实战项目一次开通，随时学习。',
			icon: BadgeCheck,
		},
		{
			title: '学习记录同步',
			desc: '学习进度自动保存，跨设备继续。',
			icon: Lock,
		},
	] as const

	return (
		<div className="flex min-h-dvh flex-col container mx-auto">
			<Card className="py-12 lg:py-16 mt-12 ">
				<CardHeader>
					<CardTitle className="text-4xl text-center">高质量教程</CardTitle>
					<CardDescription className="text-center text-xl font-light mt-3">
						精选系统课程与实战项目，快速掌握可落地的能力。
					</CardDescription>
					<div className="flex justify-center gap-3 mt-8 flex-wrap">
						{tags.map((tag, index) => (
							<Button
								variant={index == 0 ? 'destructive' : 'outline'}
								key={tag}
								onClick={() => setActiveTag(tag)}
							>
								{tag}
							</Button>
						))}
					</div>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
						{filteredCourses.map((course, index) => (
							<Card key={course.title} className="object-cover">
								<img src={`/images/${index + 1}.jpg`} alt={course.title} />
								<CardHeader>
									<CardTitle className="px-3 pt-3">{course.title} </CardTitle>
									<CardDescription className="px-3">{course.desc}</CardDescription>
								</CardHeader>

								<CardFooter className="grid grid-cols-[1fr_auto_1fr]">
									<div className="text-xs space-x-1">
										<Button variant={'outline'} size={'xs'}>
											18
										</Button>
										<span>章节</span>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild className="flex justify-center">
											<Button variant="outline" size={'sm'}>
												课程章节
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent className="w-40" align="start">
											<DropdownMenuGroup>
												<DropdownMenuLabel>课程章节</DropdownMenuLabel>
												<DropdownMenuItem>Profile</DropdownMenuItem>
											</DropdownMenuGroup>
										</DropdownMenuContent>
									</DropdownMenu>
									<div className="text-xs space-x-1 justify-self-end">
										<Button variant={'outline'} size={'xs'}>
											222
										</Button>
										<span>视频</span>
									</div>
								</CardFooter>
							</Card>
						))}
					</div>
				</CardContent>
				<CardFooter>{/* <HdPagination /> */}</CardFooter>
			</Card>

			<section className="container mx-auto mb-12">
				<div className="mt-10 rounded-2xl border bg-card p-6 text-card-foreground">
					<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
						<div>
							<div className="text-sm font-medium">会员学习计划</div>
							<p className="mt-2 text-sm text-muted-foreground">
								解锁高质量教程、配套资料与学习支持，持续提升不间断。
							</p>
							<div className="mt-4 grid gap-3 sm:grid-cols-2">
								{memberHighlights.map((item) => {
									const Icon = item.icon
									return (
										<div
											key={item.title}
											className="flex items-start gap-3 rounded-lg border bg-background/60 p-3"
										>
											<div className="mt-0.5 flex size-8 items-center justify-center rounded-md bg-muted/40">
												<Icon className="size-4 text-muted-foreground" />
											</div>
											<div>
												<div className="text-sm font-medium">{item.title}</div>
												<div className="mt-1 text-xs text-muted-foreground">{item.desc}</div>
											</div>
										</div>
									)
								})}
							</div>
						</div>
						<div className="rounded-xl border bg-background/60 p-5">
							<div className="text-sm font-medium">会员权益</div>
							<div className="mt-4 space-y-2 text-sm text-muted-foreground">
								<div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
									<span>系统课程 + 实战项目</span>
									<span className="font-medium text-foreground">全解锁</span>
								</div>
								<div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
									<span>配套资料与源码</span>
									<span className="font-medium text-foreground">持续更新</span>
								</div>
								<div className="flex items-center justify-between rounded-lg border bg-background px-3 py-2">
									<span>学习记录与进度</span>
									<span className="font-medium text-foreground">同步保存</span>
								</div>
							</div>
							<div className="mt-5 flex flex-col gap-2">
								<button className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
									立即开通
									<ArrowRight className="size-4" />
								</button>
								<button className="inline-flex items-center justify-center rounded-lg border bg-background px-4 py-2 text-sm font-medium text-foreground">
									查看会员权益
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
