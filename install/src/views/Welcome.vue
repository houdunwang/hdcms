<template>
    <div class="home">
        <div class="mt-5">
            <h2 class="text-gray-600 opacity-90 text-center pb-3 text-xl font-bold">感谢选择HDCMS</h2>
            <img src="../assets/hdcms.png" alt="" />
            <div class="flex justify-center">
                <el-button type="primary" size="default" @click="$router.push({ name: 'copyright' })">下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.state.step = 0
    }
}
</script>
