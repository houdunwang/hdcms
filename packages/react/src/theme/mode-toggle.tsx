import { Moon, Sun } from "lucide-react"

import { useTheme } from "../theme/theme-provider"
import { Button } from "../components/ui/button"

export function ModeToggle(): React.JSX.Element {
	const { setTheme, theme } = useTheme()

	const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
		const isDark = document.documentElement.classList.contains("dark")
		const newTheme = isDark ? "light" : "dark"

		// @ts-ignore
		if (!document.startViewTransition) {
			setTheme(newTheme)
			return
		}

		const x = event.clientX
		const y = event.clientY
		const endRadius = Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y)
		)

		document.documentElement.classList.add('theme-transition')

		// @ts-ignore
		const transition = document.startViewTransition(() => {
			const root = window.document.documentElement
			root.classList.remove("light", "dark")
			root.classList.add(newTheme)
			setTheme(newTheme)
		})

		transition.ready.then(() => {
			// @ts-ignore
			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${endRadius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: 500,
					easing: "ease-in-out",
					pseudoElement: "::view-transition-new(root)",
				}
			)
		})

		transition.finished.then(() => {
			document.documentElement.classList.remove('theme-transition')
		})
	}

	return (
		<Button variant="ghost" size="icon" onClick={toggleTheme}>
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
		</Button >
	)
}