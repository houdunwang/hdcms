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
			state.currentAddress = address.find(a => a.is_default) || {}
		}
	},
	actions: {
		async load({
			commit
		}) {
			const address = await api.get(`address`);
			commit('setAddress', address);
		}
	}
}
