import { registry } from '@app/admin/registry';
import { AuthEnum } from '@/types/enum';
import { userAtom } from '@/store/userStore';
import { useAtom } from 'jotai';
import { useRequestClient } from './useRequestClient';
import type { IUser } from '@/types';

export interface UseAuthReturn {
	isAuthenticated: (record?: boolean) => string | null;
	login: (data: typeof registry.$tree.auth.login.types.response.data) => void;
	getCurrentUser: () => Promise<void>;
	logout: () => void;
	user: IUser | undefined;
	setUser: (update: IUser | undefined) => void;
	isAdmin: () => boolean;
}

export const useAuth = (): UseAuthReturn => {
	const [user, setUser] = useAtom(userAtom)
	const request = useRequestClient()

	const isAdmin = (): boolean => {
		console.log('user', user)
		console.log('user?.id === 1', user?.id === 1)
		return user?.id === 1
	}

	/**
	 * @summary 检查用户是否已认证
	 * @description 检查用户是否已登录，可选记录当前页面路径
	 * @param record - 是否记录当前页面路径，用于后续重定向 - boolean @default(false)
	 * @returns 是否已认证 - boolean
	 */
	const isAuthenticated = (record = false): string | null => {
		const isLogin = localStorage.getItem(AuthEnum.TOKEN_NAME)
		if (!isLogin && record) {
			localStorage.setItem('history', window.location.href)
		}
		return isLogin
	}

	/**
	 * @summary 登录认证
	 * @description 处理用户登录认证，包括存储令牌、设置用户状态和重定向到登录前页面
	 * @param data - 登录响应数据，包含令牌和用户信息
	 */
	const login = (data: typeof registry.$tree.auth.login.types.response.data): void => {
		if (data.token) {
			localStorage.setItem(AuthEnum.TOKEN_NAME, data.token)
			const loginUrl = localStorage.getItem("history") || "/"
			setUser(data.user)
			location.href = loginUrl
		}
	}

	/**
	 * @summary 获取当前登录用户
	 * @description 从服务器获取当前认证用户的详细信息
	 */
	const getCurrentUser = async (): Promise<void> => {
		if (localStorage.getItem(AuthEnum.TOKEN_NAME)) {
			const res = await request.get('/core/users/profile', { retry: 0, })
			if (res?.data) {
				setUser(res.data)
			}
		}
	}

	/**
	 * @summary 注销登录
	 * @description 清除本地存储中的认证令牌并重置用户状态
	 */
	const logout = (): void => {
		localStorage.removeItem(AuthEnum.TOKEN_NAME)
		setUser(undefined)
		location.href = '/'
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
