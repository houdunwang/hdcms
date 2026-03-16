import { Code } from "lucide-react"
import { env } from "../core/env"
export const app = {
	appName: env('APP_NAME', ''),
	appUrl: env('APP_URL', ''),
	nodeEnv: env('NODE_ENV', 'development'),
	port: env('PORT', '3000'),
	logo: <Code />,
	icp: '鄂ICP备xxxxxxxxxx号',
	copyright: 'Copyright © 2023 Houdunyun.com All Rights Reserved',
	description: '订阅会员：解锁系统课程、实战项目与配套资料，学习记录随时可追踪。'
} as const

