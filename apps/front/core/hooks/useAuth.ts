import { registry } from '@app/admin/registry';
import { AuthEnum } from '@core/enum';
import { userAtom } from '@core/store/userStore';
import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import React from 'react';
import { useRequestClient } from './useRequestClient';

export const useAuth = () => {
	const [user, setUser] = useAtom(userAtom)
	const request = useRequestClient()
	const navigate = useNavigate()

	const isAuthenticated = React.useMemo(() => {
		const status = !!localStorage.getItem(AuthEnum.TOKEN_NAME)
		if (!status && !window.location.pathname.includes('/auth/')) {
			localStorage.setItem('history', window.location.href)
		}
		return status
	}, [user])

	const login = (data: typeof registry.$tree.auth.login.types.response.data) => {
		if (data.token) {
			localStorage.setItem(AuthEnum.TOKEN_NAME, data.token)
			const loginUrl = localStorage.getItem("history") || "/"
			setUser(data.user)
			navigate({ href: loginUrl })
		}
	}

	const getCurrentUser = async () => {
		if (localStorage.getItem(AuthEnum.TOKEN_NAME)) {
			await request.get('/core/users/me', { retry: 0, })
				.then(({ data }) => {
					setUser(data)
				})
		}
	}

	const logout = () => {
		localStorage.removeItem(AuthEnum.TOKEN_NAME)
		setUser(undefined)
		navigate({ to: '/' })
	}

	return {
		// authenticate,
		isAuthenticated,
		login,
		getCurrentUser,
		logout,
		user,
		setUser,
	}
}
