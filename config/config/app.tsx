import { Code } from "lucide-react"
export const app = {
	appName: import.meta.env.APP_NAME,
	appUrl: import.meta.env.APP_URL,
	nodeEnv: import.meta.env.NODE_ENV,
	port: import.meta.env.PORT,
	logo: <Code />,
	icp: '鄂ICP备xxxxxxxxxx号',
	copyright: 'Copyright © 2023 Houdunyun.com All Rights Reserved',
	description: '订阅会员：解锁系统课程、实战项目与配套资料，学习记录随时可追踪。'
} as const

