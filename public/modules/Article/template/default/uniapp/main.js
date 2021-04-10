import Vue from 'vue'
import App from './App'
import uView from "uview-ui";
import api from './utils/api.js'
Vue.config.productionTip = false
App.mpType = 'app'
Vue.use(uView);
Vue.prototype.api=api;

const app = new Vue({
    ...App
})
app.$mount()
