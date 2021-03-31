require('./bootstrap')
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import hdcms from './plugins/hdcms'
// import mixin from './utils/mixin'

Vue.use(hdcms)
// Vue.mixin(mixin)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
