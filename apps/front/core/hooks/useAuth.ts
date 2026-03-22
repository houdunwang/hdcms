import { userAtom } from '#core/store/userAtom';
import type { Data } from '@app/admin/data';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { useRequestClient } from './useRequestClient';
import { useApi } from './useApi';
import { useMutation } from '@tanstack/react-query';

export const useAuth = () => {
	const [user, setUser] = useAtom(userAtom)
	const api = useApi()
	const request = useRequestClient()
	const logoutMutation = useMutation(api.auth.logout.mutationOptions())

	const isAdmin = useMemo(() => {
		return user?.id === 1
	}, [user])

	/**
	 * @summary 检查用户是否已认证
	 * @description 检查用户是否已登录，可选记录当前页面路径
	 * @param record - 是否记录当前页面路径，用于后续重定向 - boolean @default(false)
	 * @returns 是否已认证 - boolean
	 */
	const isAuthenticated = useMemo(() => {
		const isLogin = Boolean(user?.id)
		if (!isLogin && !location.pathname.startsWith('/auth')) {
			localStorage.setItem('history', window.location.href)
		}
		return isLogin

	}, [user])

	/**
	 * @summary 登录认证
	 * @description 处理用户登录认证，包括存储令牌、设置用户状态和重定向到登录前页面
	 * @param data - 登录响应数据，包含令牌和用户信息
	 */
	const login = (user: Data.User): void => {
		const loginUrl = localStorage.getItem("history") || "/"
		setUser(user)
		location.href = loginUrl
	}

	/**
	 * @summary 获取当前登录用户
	 * @description 从服务器获取当前认证用户的详细信息
	 */
	const getCurrentUser = async (): Promise<void> => {
		const res = await request.get('/core/users/profile', { retry: 0, })
		if (res?.data) {
			setUser(res.data)
		}
	}

	/**
	 * @summary 注销登录
	 * @description 清除本地存储中的认证令牌并重置用户状态
	 */
	const logout = async () => {
		await logoutMutation.mutateAsync({})
		setUser(undefined)
		// location.href = '/'
	}

	return {
		isAuthenticated,
		isAdmin,
		login,
		getCurrentUser,
		logout,
		user,
		setUser,
	}
}
