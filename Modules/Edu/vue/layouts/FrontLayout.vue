<template>
    <div class="page">
        <top-menu />

        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

        <hd-footer />
        <el-backtop> </el-backtop>
    </div>
</template>

<script>
import TopMenu from './front/TopMenu'
import HdFooter from './front/Footer'
export default {
    components: { TopMenu, HdFooter }
}
</script>

<style></style>
