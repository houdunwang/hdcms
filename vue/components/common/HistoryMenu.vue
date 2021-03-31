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
                {{ route.meta.title }}
            </el-button>
        </el-button-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            routes: []
        }
    },
    watch: {
        $route(route) {
            if (route.meta.title && !Object.keys(route.params).length && !Object.keys(route.query).length) {
                const has = this.routes.some(r => r.name == route.name)
                if (!has) {
                    this.routes.push(route)
                    if (this.routes.length > 10) {
                        this.routes.shift()
                    }
                }
            }
        }
    }
}
</script>

<style></style>
