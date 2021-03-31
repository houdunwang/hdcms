import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '../router/routes'
import store from '../store'
Vue.use(VueRouter)

const router = new VueRouter({
    routes,
    mode: 'history'
})

const isLogin = window.hd.user
router.beforeEach(async (to, from, next) => {
    //清除表单验证错误
    store.commit('errors')
    //匹配的路由列表中是否有需要验证的
    if (to.matched.some(route => route.meta.auth)) {
        window.sessionStorage.setItem('redirect_url', to.fullPath)
        isLogin ? next() : (location.href = '/login')
    } else if (to.matched.some(route => route.meta.guest)) {
        //页面只能为游客访问
        isLogin ? (location.href = '/') : next()
    } else {
        next()
    }
})

export default router
