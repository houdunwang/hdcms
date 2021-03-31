require('./bootstrap')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import mixin from './utils/mixin'
import hd from '../../../vue/plugins/hdcms'
Vue.mixin(mixin)
Vue.use(hd)
new Vue({
    router,
    store,
    // render: h => h(App)
    el: '#app'
}).$mount('#app')
