import Vue from 'vue'

//系统公共组件
const system = require.context('../../../../../vue/components', true, /\.vue$/i)
system.keys().map(path => {
    const name = path
        .split('/')
        .pop()
        .split('.')[0]
    Vue.component(`Hd${name}`, system(path).default)
})

//注册自定义全局组件
const files = require.context('../components', true, /\.vue$/i)
files.keys().map(path => {
    const name = path
        .split('/')
        .pop()
        .split('.')[0]

    Vue.component(`X${name}`, files(path).default)
})

//注册自定义全局组件
const components = require.context('../components', true, /\.vue$/i)
components.keys().forEach(path => {
    const name = path
        .split('/')
        .pop()
        .split('.')[0]
    Vue.component(name, components(path).default)
})
