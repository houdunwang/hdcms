import { useApi } from '#core/hooks/useApi'
import '#core/plugin/dayjs'
import { configAtom } from '#core/store/configStore'
import { userAtom } from '#core/store/userStore'
import { useQuery } from '@tanstack/react-query'
import { useSetAtom } from 'jotai'
import { useEffect, useState } from 'react'

//应用启动初始化数据
export const useInit = () => {
	const api = useApi()
	const [isLoading, setIsLoading] = useState(true)
	const setUser = useSetAtom(userAtom)
	const setConfig = useSetAtom(configAtom)
	const { data: configData, isLoading: configLoading } = useQuery(api.configs.common.queryOptions())
	const { data: userData, isLoading: userLoading } = useQuery(api.users.profile.queryOptions())

	useEffect(() => {
		setConfig(configData?.data)
	}, [configData])

	useEffect(() => {
		setUser(userData?.data)
	}, [userData])

	useEffect(() => {
		setIsLoading(configLoading || userLoading)
	}, [configLoading, userLoading])
	return isLoading
}