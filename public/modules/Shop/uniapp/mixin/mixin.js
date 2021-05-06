import store from '@/store/index.js';

export default {
	onLoad() {},
	computed: {
		user() {
			return store.state.user
		},
		isLogin() {
			return Boolean(this.user.id)
		},
		statusbarHeight() {
			// return uni.getSystemInfo().getStatusbarHeight()
		}
	},
	methods: {
		//tabbar跳转
		switchTab(url) {
			uni.switchTab({
				url
			})
		},
		//页面跳转
		redirect(page, params = {}) {
			const queryStr = Object.entries(params).map(([k, v]) => `${k}=${v}`).join('')
			const url = `${page}?${queryStr}`

			uni.navigateTo({
				url
			})
		},
		loginCheck() {
			if (Boolean(store.state.user.id) === false) {
				uni.showToast({
					title: "请登录后操作",
					duration: 3000
				})
				uni.navigateTo({
					url: "/pages/login/login"
				})
			}
		}
	}
}
