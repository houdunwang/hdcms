import { useApi } from '#core/hooks/useApi'
import '#core/plugin/dayjs'
import { configAtom } from '#core/store/configStore'
import { userAtom } from '#core/store/userStore'
import { AuthEnum } from '#core/types/enum'
import { useQueries } from '@tanstack/react-query'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

//应用启动初始化数据
export const useInit = () => {
	const api = useApi()
	const [user, setUser] = useAtom(userAtom)
	const [config, setConfig] = useAtom(configAtom)
	const multiResult = useQueries({
		queries: [
			api.configs.common.queryOptions(),
			api.users.profile.queryOptions({}, {
				enabled: !!localStorage.getItem(AuthEnum.TOKEN_NAME)
			})
		]
	})

	const configData = multiResult[0].data?.data
	const userData = multiResult[1].data?.data

	useEffect(() => {
		if (configData) {
			setConfig(configData)
		}
	}, [configData])

	useEffect(() => {
		if (userData) {
			setUser(userData)
		}
	}, [userData])

	const isLoading = multiResult.some(q => q.isLoading) || (!!userData && !user) || (!!configData && !config)
	return isLoading
}