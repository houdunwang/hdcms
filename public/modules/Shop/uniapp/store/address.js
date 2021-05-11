import api from '@/utils/api.js';

export default {
	namespaced: true,
	state() {
		return {
			address: [],
			currentAddress: {}
		}
	},
	mutations: {
		//选中地址
		setCurrentAddress(state, id) {
			state.currentAddress = state.address.find(a=>a.id==id)
		},
		//初始地址数据
		setAddress(state, address) {
			state.address = address
		}
	},
	actions: {
		//加载地址数据
		async load(context) {
			const address = await api.get(`address`);
			context.commit('setAddress', address);
		}
	}
}
