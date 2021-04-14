import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from './utils/api.js'
import store from './store'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView);
Vue.prototype.api = api;
const app = new Vue({
	store,
    ...App
})
app.$mount()
