import store from '@/store/index.js';
import {
	mapState
} from 'vuex'

export default {
	onLoad() {},
	computed: {
		...mapState('user', ['user']),
		isLogin() {
			return Boolean(this.user.id)
		},
	},
	onShow(){
		if (uni.getStorageInfoSync('token')) {
			//加载当前用户
			store.dispatch('user/getCurrentUser')
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
			if (Boolean(this.user.id) === false) {
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
