import { Link } from "@tanstack/react-router"
import { CodeIcon } from "lucide-react"

// 导航菜单
const menus = [
	{
		title: '软件仓库',
		to: 'https://www.houdunyun.com',
	},
	{
		title: '高质量教程',
		to: 'https://www.houdunren.com',
	},
]
export const headerConfig = {
	logo: <div className="flex items-center gap-1"><CodeIcon /> houdunyun</div>,
	menus: <div className="flex items-center gap-6 ml-3">
		{menus.map((item) => (
			<Link key={item.title} to={item.to}>{item.title}</Link>
		))}
	</div>
}

