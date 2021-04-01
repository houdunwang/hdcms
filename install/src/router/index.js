import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '@/views/Welcome.vue'
import Copyright from '@/views/Copyright.vue'
import Env from '@/views/Env.vue'
import Database from '@/views/Database.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'welcome',
        component: Welcome
    },
    {
        path: '/copyright',
        name: 'copyright',
        component: Copyright
    },
    {
        path: '/env',
        name: 'env',
        component: Env
    },
    {
        path: '/database',
        name: 'database',
        component: Database
    }
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

export default router
