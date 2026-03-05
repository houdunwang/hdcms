import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LoginLayout, WechatLoginComponent, WechatIntroduce } from '@hd/react/components'
import { useAuth } from '@hd/react/hooks'
import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, CalendarCheck, Clock, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react'
import React from 'react'

const highlights = [
	{
		title: '体系化学习路径',
		description: '从基础入门到高阶实战，循序渐进的完整学习路径，让成长有迹可循。',
		icon: BookOpen,
	},
	{
		title: '企业级项目实战',
		description: '基于真实业务场景深度拆解，打造高含金量作品集，助力职场进阶。',
		icon: Sparkles,
	},
	{
		title: '云端同步进度',
		description: '多端进度实时云同步，随时随地无缝衔接学习状态，利用碎片时间高效成长。',
		icon: CalendarCheck,
	},
	{
		title: '多维学习闭环',
		description: '视频精讲、图文文档与实战练习深度结合，构建全方位知识体系。',
		icon: ShieldCheck,
	},
] as const

export const Route = createFileRoute('/auth/wechat')({
	component: Page,
})

function Page() {
	return <LoginLayout introduce={<WechatIntroduce />}>
		<WechatLoginComponent />
	</LoginLayout>

}

