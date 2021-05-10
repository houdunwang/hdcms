import api from '@/utils/api.js';
export default {
	namespaced: true,
	state() {
		return {
			cart: [],
		}
	},
	getters: {
		//购物车商品总价
		totalPrice: (state) => (onlySelected = false) => {
			return state.cart.reduce((s, g) => {
				if (onlySelected && !g.selected) return s;

				return s += Number(g.price) * Number(g.number)
			}, 0) || 0
		},
		//购物车商品数量
		totalNumber: (state) => (onlySelected = false) => {
			return state.cart.reduce((s, g) => {
				if (onlySelected && !g.selected) return s;
				return s += Number(g.number)
			}, 0) || 0
		}
	},
	mutations: {
		//添加购物车
		add(state, goods) {
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
		remove(state, goods) {
			const i = state.cart.indexOf(goods)
			state.cart.splice(i, 1);
		},
		//初始化购物车
		resetCart(state) {
			state.cart = []
		}
	},
	actions: {}
}
