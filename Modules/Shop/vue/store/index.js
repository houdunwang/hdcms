import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        errors: {},
        user: {},
        site: window.site,
        module: window.module,
        //历史菜单
        historyMenus: [],
        //站内消息
        siteMessage: {}
    },
    getters: {
        errors: state => name => {
            return state.errors[name] && state.errors[name][0]
        }
    },
    mutations: {
        errors(state, errors = {}) {
            state.errors = errors
        },
        user(state, user) {
            state.user = user
        },
        site(state, site) {
            state.site = site
        },
        //添加历史菜单
        addHistoryMenus(state, menu) {
            const has = state.historyMenus.some(m => m.route.name == menu.route.name)
            if (!has) {
                state.historyMenus.push(menu)
                if (state.historyMenus.length > 10) {
                    state.historyMenus.shift()
                }
            }
        },
        module(state, module) {
            state.module = module
        },
        siteMessage(state, siteMessage) {
            state.siteMessage = siteMessage
        }
    },
    actions: {
        async user({ commit }) {
            commit('user', await axios.get(`/api/user/info`))
        },
        async site({ commit }) {
            commit('site', await axios.get(`/api/site/current`))
        },
        async module({ commit }) {
            commit('module', await axios.get(`/api/module/current`))
        },
        //获取站内消息
        async siteMessage({ commit }, page = 1) {
            commit('siteMessage', await axios.get(`message?page=${page}`))
        }
    }
})
