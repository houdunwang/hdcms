import { Footer } from "@houdunyun/react/components"
import { Code } from "lucide-react"

export const appConfig: React.ComponentProps<typeof Footer> = {
	siteName: 'framework',
	domain: 'https://www.houdunyun.com',
	logo: <Code />,
	icp: '鄂ICP备xxxxxxxxxx号',
	copyright: 'Copyright © 2023 Houdunyun.com All Rights Reserved',
	description: '订阅会员：解锁系统课程、实战项目与配套资料，学习记录随时可追踪。'
}
