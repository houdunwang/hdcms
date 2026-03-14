import { type AnyRouter } from '@tanstack/react-router'
import nprogress from 'nprogress'
import { useEffect } from 'react'
nprogress.configure({ showSpinner: false })

//页面切换进度条
export function RouteProgressBar({ router }: { router: AnyRouter }) {
	useEffect(() => {
		const unsubBefore = router.subscribe('onBeforeLoad', () => {
			nprogress.start()
		})
		const unsubLoad = router.subscribe('onLoad', () => {
			nprogress.done()
		})

		// 返回一个包含所有清理操作的函数
		return () => {
			unsubBefore()
			unsubLoad()
		}
	}, [router])

	return null
}