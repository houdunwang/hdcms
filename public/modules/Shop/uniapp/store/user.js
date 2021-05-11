import api from '@/utils/api.js';
export default {
	namespaced: true,
	state: {
		user: {},
	},
	mutations: {
		//保存用户
		saveLoginUser(state, user) {
			state.user = user
			uni.setStorageSync('user', user)

		},
		//退出登录
		logout(state) {
			uni.removeStorageSync('token')
			state.user = {}
		}
	},
	actions: {
		//获取当前用户资料
		getCurrentUser(context) {
			const token = uni.getStorageSync('token')
			if (token) {
				api.get(`/user/info`).then(user => {
					context.commit('saveLoginUser', user)
					return user;
				}).catch(_ => {
					uni.removeStorageSync('token')
				})
			}
		},
		//会员登录
		async login(context, payload) {
			return api.post(`/login`, payload).then(res => {
				context.commit('saveLoginUser', res.data)
				uni.setStorageSync('token', res.token)
			}).catch(() => {
				uni.showToast({
					title: '帐号或密码错误'
				})
			})
		}
	}
}
