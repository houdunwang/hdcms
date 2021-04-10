import _ from 'lodash'

const install = function(Vue) {
    Vue.mixin({
        computed: {
            hd: {
                get: function() {
                    return _.merge(window.hd, {
                        //登录检测
                        isLogin: window.hd.user,
                        //路由跳转
                        router: (name, params, query) => {
                            return this.$router.push({ name, params, query })
                        },
                        //退出登录
                        logout() {
                            location.href = '/logout'
                        },
                        //权限判断
                        access: (name, site = null) => {
                            site = site || this.hd.site
                            if (this.hd.user.isSuperAdmin || site.isMaster) {
                                return true
                            }
                            return this.hd.permissions.some(p => p == `s${site.id}-${name}`)
                        },
                        //滚动到元素位置
                        scrollTo(el) {
                            setTimeout(() => {
                                const element = document.querySelector(el)
                                if (element) {
                                    const y = element.getBoundingClientRect().top + document.documentElement.scrollTop
                                    document.documentElement.scroll({ top: y, behavior: 'smooth' })
                                }
                            })
                        }
                    })
                }
            }
        }
    })
}

export default install
