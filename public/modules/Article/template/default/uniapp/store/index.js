import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/utils/api.js'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
		categories:[],
		hd:'abc'
    },
    getters: {
       
    },
    mutations: {
      category(state,categories){
		  state.categories = categories
	  }
    },
    actions: {
		async category({commit}){
			commit('category',await api.get(`category`))
		}
	}
})
