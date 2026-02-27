import { userStore } from "core/store/userStore"
import type { User } from "core/types/models/user"
import { useApi } from "./useApi"
import type { Login200Response } from "core/types/models/login200-response"

export const useAuth = () => {
	const api = useApi()
	const isLogin = () => {
		const isLogin = localStorage.getItem("token") !== null
		if (!isLogin) {
			localStorage.setItem("history", window.location.href)
		}
		return isLogin
	}

	const login = (data: Login200Response) => {
		if (data.token?.token) {
			// localStorage.setItem("token", data.token.token)
		}

	}
	const getCurrentUser = async () => {
		// const user = await api.get<User>('/core/users/me')
		// userStore.setState(() => user)
	}

	return {
		isLogin,
		getCurrentUser,
	}
}