<template>
    <div class="mx-5 mb-2 bg-white shadow-sm p-2 rounded-sm" v-if="routes.length">
        <el-button-group>
            <el-button
                size="mini"
                v-for="(route, index) in routes"
                :key="index"
                @click="$router.push(route)"
                :type="route.name == $route.name ? 'primary' : 'default'"
            >
                {{ route.title }}
            </el-button>
        </el-button-group>
    </div>
</template>

<script>
export default {
    props: {
        num: {
            type: Number,
            default: 10
        }
    },
    data() {
        return {
            routes: []
        }
    },
    computed: {
        cacheKey() {
            return `S${this.hd.site.id}-M${this.hd.module.id}-history_menu`
        }
    },
    created() {
        const cache = window.localStorage.getItem(this.cacheKey)
        if (cache) {
            this.routes = JSON.parse(cache)
        }
    },
    watch: {
        $route(route) {
            if (route.meta.title && !Object.keys(route.params).length && !Object.keys(route.query).length) {
                const has = this.routes.some(r => r.name == route.name)
                if (!has) {
                    this.routes.push({ name: route.name, title: route.meta.title })
                    if (this.routes.length > this.num) {
                        this.routes.shift()
                    }
                    window.localStorage.setItem(this.cacheKey, JSON.stringify(this.routes))
                }
            }
        }
    }
}
</script>

<style></style>
