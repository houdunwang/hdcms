<template>
    <div class="home">
        <div class="mt-10">
            <div class="text-center text-gray-800 opacity-80">
                <div v-if="error" class="text-red-700">{{ error }}</div>
                <div v-else>
                    数据导入中，请不要刷新页面...
                </div>
            </div>
            <div class="flex justify-center mt-10">
                <el-button type="success" size="default" @click="$router.push({ name: 'database' })" v-if="error">上一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            error: ''
        }
    },
    created() {
        this.$store.state.step = 4
        this.axios.get(`api/install/migration`).then(res => {
            if (res == 'success') {
                this.$router.push({ name: 'done' })
            } else {
                this.error = res
            }
        })
    },
    methods: {}
}
</script>

<style></style>
