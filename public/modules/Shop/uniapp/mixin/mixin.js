import store from '@/store/index.js';
import {
	mapState
} from 'vuex'

export default {
	onLoad() {},
	computed: {
		...mapState('user', {
			user: state => state.user
		}),
		isLogin() {
			return Boolean(uni.getStorageInfoSync('token'))
		},
	},
	methods: {
		//初始化
		init() {
			if (this.isLogin) {
				//加载当前用户
				store.dispatch('user/getCurrentUser')
				//加载收货地址
				store.dispatch('address/load')
			}
		},
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
