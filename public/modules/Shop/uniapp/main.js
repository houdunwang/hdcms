import Vue from 'vue'
import App from './App'
import config from './config.js'
import mixin from './mixin/mixin.js'
import api from './utils/api.js'
import uView from 'uview-ui';
import store from './store/index.js'
Vue.config.productionTip = false
Vue.use(uView);

// 项目配置
Vue.prototype.$config = config
// 网络请求
Vue.prototype.$api = api;
Vue.prototype.$store = store

Vue.mixin(mixin)
App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
