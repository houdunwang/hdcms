import { registry } from '@app/admin/registry';
import { userAtom } from '@core/store/userStore';
import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import React from 'react';
import { useApi, useTuyauClient } from './useApi';

export const useAuth = () => {
	const [user, setUser] = useAtom(userAtom)
	const tuyauClient = useTuyauClient()
	const navigate = useNavigate()

	const isLogin = React.useMemo(() => {
		return !!user?.id
	}, [user])

	const login = (data: typeof registry.$tree.auth.login.types.response.data) => {
		if (data.token) {
			localStorage.setItem("auth_token", data.token)
			const loginUrl = localStorage.getItem("history") || "/"
			navigate({ href: loginUrl })
		}
	}

	const getCurrentUser = async () => {
		if (localStorage.getItem('auth_token')) {
			await tuyauClient.get('/core/users/me', { retry: 0, })
				.then(({ data }) => {
					setUser(data)
				})
		}
		document.querySelector('.loading')?.remove()
	}

	const logout = () => {
		localStorage.removeItem("auth_token")
		setUser(undefined)
		navigate({ to: '/' })
	}

	return {
		isLogin,
		login,
		getCurrentUser,
		logout,
	}
}
