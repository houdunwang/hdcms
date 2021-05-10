import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import user from './user.js'
Vue.use(Vuex);

export default new Vuex.Store({
	modules:{
		cart,user
	}
})