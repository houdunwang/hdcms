import api from '@/utils/api.js';
export default {
	namespaced: true,
	state: {
		user: {},
	},
	getters: {},
	mutations: {
		//保存用户
		saveLoginUser(state, user) {
			state.user = user
			uni.setStorageSync('user', user)
		},
		logout(state) {
			uni.removeStorageSync('token')
			state.user = {}
		}
	},
	actions: {
		//获取当前用户资料
		getCurrentUser({
			commit
		}) {
			const token = uni.getStorageSync('token')
			if (token) {
				api.get(`/user/info`).then(user => {
					commit('saveLoginUser', user)
					return user;
				}).catch(_ => {
					uni.removeStorageSync('token')
				})
			}
		},
		//会员登录
		async login({
			commit,
			state
		}, payload) {
			return api.post(`/login`, payload).then(res => {
				commit('saveLoginUser', res.data)
				uni.setStorageSync('token', res.token)

			}, res => {
				uni.showToast({
					title: '帐号或密码错误'
				})
			})
		}
	}
}
