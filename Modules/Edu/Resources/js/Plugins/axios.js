import axios from 'axios'
import Vue from 'vue'
import el from 'element-ui'
// import store from '@/store'
import httpStatus from '@/utils/httpStatus'
const _axios = axios.create({ baseURL: '/', timeout: 5000 })
_axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.axios = Vue.prototype.axios = _axios

//请求拦截
// _axios.interceptors.request.use(
//     function(config) {
//         return config
//     },
//     function(error) {
//         return Promise.reject(error)
//     }
// )
//响应拦截
_axios.interceptors.response.use(
    //成功拦截
    function(response) {
        let { message } = response.data
        if (message) {
            el.Message({
                message,
                type: 'success'
            })
        }
        return response.data
    },
    //错误拦截
    function(error) {
        let { status, data } = error.response
        switch (status) {
            case 422:
                //     store.commit('setErrors', data)
                break
            default:
                el.MessageBox.confirm(data.message || httpStatus(status), '温馨提示', {
                    showCancelButton: false,
                    confirmButtonText: '关闭',
                    type: 'warning'
                })
        }
        return Promise.reject(error)
    }
)