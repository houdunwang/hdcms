import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
// import { HdHeader } from '@houdunyun/ui'
import {
  ArrowRight,
  Bell,
  BookOpen,
  Bookmark,
  CalendarCheck,
  Code2,
  LayoutGrid,
  ShieldCheck,
  Sparkles,
  Star,
  Terminal,
  Video,
} from 'lucide-react'

export const Route = createFileRoute('/_front/')({
  component: HomePage,
})

export function HomePage() {
  const features = [
    {
      title: '系统课程',
      description: '从基础到进阶的体系化内容，学习路线清晰可追踪。',
      icon: LayoutGrid,
    },
    {
      title: '实战项目',
      description: '围绕真实业务场景拆解需求，做出可展示的作品集。',
      icon: Code2,
    },
    {
      title: '视频学习',
      description: '用演示讲清思路与细节，关键节点配套示例与资料。',
      icon: Video,
    },
    {
      title: '学习文档',
      description: '随学随查、随用随检索，沉淀成你的个人知识库。',
      icon: BookOpen,
    },
    {
      title: '学习记录',
      description: '自动保存章节进度与学习记录，随时续学不掉队。',
      icon: CalendarCheck,
    },
    {
      title: '更新订阅',
      description: '课程上新与内容迭代第一时间通知，不错过关键更新。',
      icon: Bell,
    },
  ] as const

  const courses = [
    {
      title: 'PHP / Laravel 系统课程',
      level: '系统课',
      tags: ['后端', '工程化', '上线部署'],
      desc: '从框架基础到项目实战，掌握开发、测试与部署的完整流程。',
    },
    {
      title: 'Vue3 + TypeScript 实战',
      level: '实战',
      tags: ['组件', '路由', '状态管理'],
      desc: '以业务场景驱动学习，掌握可维护的前端工程化实践。',
    },
    {
      title: 'React 全家桶与工程实践',
      level: '进阶',
      tags: ['Hooks', '性能', '架构'],
      desc: '从组件设计到性能优化，建立可扩展的前端架构能力。',
    },
    {
      title: 'Node / NestJS API 开发',
      level: '进阶',
      tags: ['鉴权', '错误处理', '中间件'],
      desc: '构建可上线的 API 服务：鉴权、日志、异常与规范化结构。',
    },
  ] as const

  const testimonials = [
    {
      name: '张同学',
      role: '前端转行',
      rating: 5,
      course: 'React 组件与状态管理',
      content:
        '以前只会跟着教程敲，遇到需求就卡住。这里的练习是“逼你写出来”，而且反馈很快，进步非常明显。',
    },
    {
      name: '李同学',
      role: '在职提升',
      rating: 5,
      course: 'TypeScript 入门到实战',
      content:
        '最大的收获是类型思维。以前写 TS 像写 JS，这套课程把常见坑和最佳实践讲得很清楚，工作里直接用上。',
    },
    {
      name: '王同学',
      role: '应届求职',
      rating: 5,
      course: '全栈项目：在线学习平台',
      content:
        '做完项目后简历瞬间有东西写了：鉴权、上传、部署、日志…面试问到的点基本都覆盖到了。',
    },
    {
      name: '陈同学',
      role: '零基础入门',
      rating: 5,
      course: 'Node.js API 与鉴权',
      content:
        '文档 + 视频 + 练习的组合很舒服。每章都能闭环，不会像以前那样看完就忘。',
    },
    {
      name: '赵同学',
      role: '项目负责人',
      rating: 5,
      course: 'React 组件与状态管理',
      content:
        '内容不花哨但很实用，尤其是组件拆分和性能那部分。团队里新人跟着学能少走很多弯路。',
    },
    {
      name: '周同学',
      role: '全栈进阶',
      rating: 5,
      course: 'Node.js API 与鉴权',
      content:
        '把错误处理、鉴权、路由组织这些“工程化细节”讲透了。学完再看开源项目能看懂它为什么这样设计。',
    },
  ] as const

  const faqs = [
    {
      q: '适合零基础吗？',
      a: '适合。课程会把“为什么这样写”讲清楚，并通过小练习把知识点落地。',
    },
    {
      q: '更偏视频还是文档？',
      a: '两者都有。视频用于讲思路与演示，文档用于检索与复习，练习用于巩固。',
    },
    {
      q: '学完能做什么？',
      a: '能独立完成中小型 Web 项目，具备从开发到上线的完整经验。',
    },
    {
      q: '订阅/开通会员能获得什么？',
      a: '可解锁系统课程与配套资料，包含项目源码与章节更新；同时提供学习记录与更新提醒，方便你持续推进。',
    },
    {
      q: '内容会持续更新吗？',
      a: '会。课程与文档会根据技术栈迭代持续补充与修订，订阅后可第一时间收到上新提醒。',
    },
    {
      q: '没有时间一次学完怎么办？',
      a: '支持学习记录与进度保存，你可以按自己的节奏学习，随时从上次位置继续。',
    },
    {
      q: '是否提供项目源码与资料下载？',
      a: '系统课与实战课会提供配套源码、资料与关键章节的可复用模板，方便你对照学习与复盘。',
    },
  ] as const

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <section className="relative overflow-hidden border-b ">
          <div className="container">
            <div className="mx-auto py-14 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
                <div className="flex flex-col gap-6">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground shadow-sm backdrop-blur">
                    <Sparkles className="size-4" />
                    <span>系统课程 · 实战项目 · 学习资料</span>
                  </div>

                  <div className="flex flex-col gap-4">
                    <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                      从零开始成为编程专家
                      <br />
                      {/* 在线教育与技术社区 */}
                    </h1>
                    <p className="max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
                      系统课程、实战项目与学习文档，帮助你更高效地把知识用到项目里，走完从入门到就业的完整路径。
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <Button asChild size="lg" className="gap-2" variant={'destructive'}>
                      <Link to='/' >
                        马上学习
                        <ArrowRight className='size-4' />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                      <Link to='/demo'>查看课程分类</Link>
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span className="rounded-md border bg-background/60 px-2 py-1">循序渐进</span>
                    <span className="rounded-md border bg-background/60 px-2 py-1">即时反馈</span>
                    <span className="rounded-md border bg-background/60 px-2 py-1">项目作品集</span>
                    <span className="rounded-md border bg-background/60 px-2 py-1">可复习可检索</span>
                  </div>
                </div>

                <div className="lg:justify-self-end">
                  <div className="rounded-xl border bg-card text-card-foreground shadow-sm">
                    <div className="flex items-center justify-between border-b px-4 py-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <ShieldCheck className="size-4 text-muted-foreground" />
                        学习入口
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="rounded-full border px-2 py-0.5">系统课程</span>
                        <span className="rounded-full border px-2 py-0.5">实战项目</span>
                      </div>
                    </div>

                    <div className='p-4'>
                      <div className="rounded-lg border bg-background">
                        <div className="flex items-start gap-3 p-3">
                          <div className="mt-0.5 flex size-9 items-center justify-center rounded-md bg-muted/30">
                            <LayoutGrid className="size-4 text-muted-foreground" />
                          </div>
                          <div className='min-w-0'>
                            <div className="text-sm font-medium">系统课程</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              按知识体系拆分章节，循序渐进建立能力栈。
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 border-t p-3">
                          <div className="mt-0.5 flex size-9 items-center justify-center rounded-md bg-muted/30">
                            <Terminal className="size-4 text-muted-foreground" />
                          </div>
                          <div className='min-w-0'>
                            <div className="text-sm font-medium">实战项目</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              围绕真实业务场景产出可展示的项目成果。
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 border-t p-3">
                          <div className="mt-0.5 flex size-9 items-center justify-center rounded-md bg-muted/30">
                            <BookOpen className="size-4 text-muted-foreground" />
                          </div>
                          <div className='min-w-0'>
                            <div className="text-sm font-medium">学习文档</div>
                            <div className="mt-1 text-xs text-muted-foreground">
                              文档与课程同步更新，随时检索关键知识点。
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <div className="flex flex-1 items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                          <Bell className="size-4 text-muted-foreground" />
                          <div className='min-w-0'>
                            <div className="text-xs text-muted-foreground">更新</div>
                            <div className="mt-0.5 text-sm font-medium">上新提醒</div>
                          </div>
                        </div>
                        <div className="flex flex-1 items-center gap-3 rounded-lg bg-muted/30 px-3 py-2">
                          <Bookmark className="size-4 text-muted-foreground" />
                          <div className='min-w-0'>
                            <div className="text-xs text-muted-foreground">收藏</div>
                            <div className="mt-0.5 text-sm font-medium">随时回看</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden='true'
          >
            <div className="absolute -z-10 -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-muted blur-3xl opacity-60" />
            <div className="absolute -z-10 -bottom-24 left-1/3 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-muted blur-3xl opacity-50" />
          </div>
        </section>

        <section className="container ">
          <div className="mx-auto py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-4">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  学习体验围绕“可落地”设计
                </h2>
                <p className="mt-3 text-muted-foreground">
                  用一致的组件风格与清晰的信息层级，让学习路径、项目产出与进阶方向更直观。
                </p>

                <div className="mt-6 rounded-xl border bg-card p-5 text-card-foreground bg-muted">
                  <div className="text-sm font-medium">你会得到什么</div>
                  <div className="mt-4 grid gap-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-8 items-center justify-center rounded-md bg-muted/30">
                        <Terminal className="size-4 text-muted-foreground" />
                      </div>
                      <div className='min-w-0'>
                        <div className="text-sm font-medium">可复用的工程方法</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          把“怎么做”落到项目结构、规范与流程上。
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-8 items-center justify-center rounded-md bg-muted/30">
                        <CalendarCheck className="size-4 text-muted-foreground" />
                      </div>
                      <div className='min-w-0'>
                        <div className="text-sm font-medium">学习计划与进度</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          记录章节进度与学习节奏，随时从上次位置继续。
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex size-8 items-center justify-center rounded-md bg-muted/30">
                        <BookOpen className="size-4 text-muted-foreground" />
                      </div>
                      <div className='min-w-0'>
                        <div className="text-sm font-medium">随时可查的资料库</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          把课程内容沉淀为可以检索的知识点。
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                  {features.map((item, index) => {
                    const Icon = item.icon
                    const bentoClass =
                      index === 0
                        ? 'sm:col-span-2 lg:col-span-4'
                        : index === 1
                          ? 'lg:col-span-2'
                          : index === 2
                            ? 'lg:col-span-3'
                            : index === 3
                              ? 'lg:col-span-3'
                              : index === 4
                                ? 'lg:col-span-2'
                                : 'lg:col-span-4'

                    return (
                      <div
                        key={item.title}
                        className={`group rounded-xl border bg-card p-3 text-card-foreground transition-colors hover:bg-accent/30 ${bentoClass}`}
                      >
                        <div className="flex items-center gap-1">
                          <div className="flex size-10 items-center justify-center rounded-lg bg-muted/30">
                            <Icon className="size-5 text-muted-foreground" />
                          </div>
                          <div className="text-sm font-medium">{item.title}</div>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto">
          <div className="mx-auto pb-14 lg:pb-20">
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                学员好评
              </h2>
              <p className="max-w-2xl text-muted-foreground">
                来自真实学习者的反馈，帮助你判断这是否是适合你的学习方式。
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card px-5 py-4 text-card-foreground">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-current text-foreground"
                    />
                  ))}
                </div>
                <div className="text-sm font-medium">5.0 / 5.0</div>
                <div className="text-sm text-muted-foreground">
                  · {testimonials.length} 条精选评价
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                支持横向滑动查看更多
              </div>
            </div>

            <div className="relative mt-6 overflow-hidden">
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-12 "
                aria-hidden='true'
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-12 "
                aria-hidden='true'
              />

              <div className="flex snap-x snap-proximity gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4">
                {testimonials.map((t) => (
                  <div
                    key={t.name + t.course}
                    className="w-[320px] shrink-0 snap-start rounded-xl border bg-card p-5 text-card-foreground sm:w-[360px] "
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`size-4 ${i < t.rating
                              ? 'fill-current text-foreground'
                              : 'fill-transparent text-muted-foreground'
                              }`}
                          />
                        ))}
                      </div>
                      <span className="rounded-md border bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                        {t.course}
                      </span>
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground">
                      “{t.content}”
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full border bg-background text-sm font-medium">
                        {t.name.slice(0, 1)}
                      </div>
                      <div className='min-w-0'>
                        <div className="text-sm font-medium">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y bg-muted/20">
          <div className="container mx-auto">
            <div className="mx-auto py-14 lg:py-20">
              <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    系统课程与实战方向
                  </h2>
                  <p className="max-w-xl text-muted-foreground">
                    围绕前端、后端与工程化能力构建课程矩阵，按阶段推进，形成可复用的知识体系。
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {courses.map((c) => (
                    <div
                      key={c.title}
                      className="rounded-xl border bg-card p-5 text-card-foreground"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="text-sm font-medium">{c.title}</div>
                        <span className="shrink-0 rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground">
                          {c.level}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border bg-background/60 px-2 py-1 text-xs text-muted-foreground"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 rounded-xl border bg-background p-6">
                <div className="grid gap-6 lg:grid-cols-3 lg:items-center">
                  <div className="lg:col-span-2">
                    <div className="text-sm font-medium">
                      开通会员，解锁完整学习体验
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      系统课程、实战项目与学习资料按需获取，学习记录与更新提醒帮助你持续推进。
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-md border bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                        系统课程
                      </span>
                      <span className="rounded-md border bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                        实战项目
                      </span>
                      <span className="rounded-md border bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                        学习资料
                      </span>
                      <span className="rounded-md border bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                        更新提醒
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 lg:justify-end">
                    <Button size="lg" className="gap-2">
                      立即开通
                      <ArrowRight className='size-4' />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto">
          <div className="mx-auto py-14 lg:py-20">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                  常见问题
                </h2>
                <p className="max-w-xl text-muted-foreground">
                  先解决你的疑问，再开始投入学习。
                </p>
              </div>

              <div className="grid gap-3">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group rounded-lg border bg-card px-5 py-4 text-card-foreground"
                  >
                    <summary className="cursor-pointer list-none text-sm font-medium outline-none">
                      <div className="flex items-center justify-between gap-3">
                        <span>{f.q}</span>
                        <span className="text-muted-foreground transition-transform group-open:rotate-180">
                          <ArrowRight className="size-4 rotate-90" />
                        </span>
                      </div>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
