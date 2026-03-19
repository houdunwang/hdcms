import { configAtom } from '#core/store/configStore'
import { useQueries } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { useApi } from '#core/hooks/useApi'
import '#core/plugin/dayjs'
import { userAtom } from '#core/store/userStore'
import { AuthEnum } from '#core/types/enum'

export const useInit = () => {
	const api = useApi()
	const setUser = useSetAtom(userAtom)
	const setConfig = useSetAtom(configAtom)
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
	}, [configData, setConfig])

	useEffect(() => {
		if (userData) {
			setUser(userData)
		}
	}, [userData, setUser])
	const isLoading = multiResult.some(q => q.isLoading)
	return isLoading
}