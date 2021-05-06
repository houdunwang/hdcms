import api from '@/utils/api.js';
export default {
	state: {
		//购物车
		cart: [],
		user: {},
	},
	getters: {
		//购物车商品总价
		cartGoodsTotalPrice: (state) => (onlySelected = false) => {
			return state.cart.reduce((s, g) => {
				if (onlySelected && !g.selected) return s;

				return s += Number(g.price) * Number(g.number)
			}, 0) || 0
		},
		cartGoodsTotalNumber: (state) => (onlySelected = false) => {
			return state.cart.reduce((s, g) => {
				if (onlySelected && !g.selected) return s;
				return s += Number(g.number)
			}, 0) || 0
		}
	},
	mutations: {
		//添加购物车
		addCart(state, payload) {
			const goods = payload.goods
			const cartGoods = state.cart.find(g => {
				return g.goods_sn == goods.goods_sn;
			})
			if (cartGoods) {
				cartGoods.number = goods.number
			} else {
				state.cart.push(goods)
			}
		},
		//移除购物车商品
		removeCartGoods(state, goods) {
			const i = state.cart.indexOf(goods)
			state.cart.splice(i, 1);
		},
		//保存用户
		saveLoginUser(state,user){
			state.user = user
			uni.setStorageSync('user',user)
		}
	},
	actions: {
		//获取当前用户资料
		getCurrentUser({commit}){
			const token  = uni.getStorageSync('token')
			return api.get(`/user/info`).then(user=>{
				commit('saveLoginUser',user)
				return user;
			})
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
