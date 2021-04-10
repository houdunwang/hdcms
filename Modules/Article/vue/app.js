require('./bootstrap')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import hd from '../../../vue/plugins/hdcms'
Vue.use(hd)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
