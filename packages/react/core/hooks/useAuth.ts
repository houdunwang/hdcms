import { registry } from '@app/admin/registry';
import { AuthEnum } from '@core/enum';
import { userAtom } from '@core/store/userStore';
import { useAtom } from 'jotai';
import { useRequestClient } from './useRequestClient';

export const useAuth = () => {
	const [user, setUser] = useAtom(userAtom)
	const request = useRequestClient()

	const isAuthenticated = (record = false) => {
		const isLogin = !!user?.id
		if (!isLogin && record) {
			localStorage.setItem('history', window.location.href)
		}
		return isLogin
	}

	const login = (data: typeof registry.$tree.auth.login.types.response.data) => {
		if (data.token) {
			localStorage.setItem(AuthEnum.TOKEN_NAME, data.token)
			const loginUrl = localStorage.getItem("history") || "/"
			setUser(data.user)
			location.href = loginUrl
		}
	}

	const getCurrentUser = async () => {
		if (localStorage.getItem(AuthEnum.TOKEN_NAME)) {
			const res = await request.get('/core/users/profile', { retry: 0, })
			if (res?.data) {
				setUser(res.data)
			}
		}
	}

	const logout = () => {
		localStorage.removeItem(AuthEnum.TOKEN_NAME)
		setUser(undefined)
		location.href = '/'
	}

	return {
		isAuthenticated,
		login,
		getCurrentUser,
		logout,
		user,
		setUser,
	}
}
