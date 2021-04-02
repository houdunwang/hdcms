<template>
    <div id="app" class="m-auto mt-10">
        <div class="flex justify-center">
            <img src="./assets/logo-blue.png" class="h-20" />
        </div>
        <step />
        <div class="border p-3 shadow-lg mt-5 rounded-md bg-white">
            <div v-if="message == 'success'">
                <router-view />
            </div>
            <div v-if="message == 'isInstall'" class="py-6 text-red-700 opacity-80 text-center font-bold">
                <i class="fas fa-info-circle    "></i> 系统已经安装！请删除public/install.lock文件后操作
            </div>
        </div>
        <div class="text-sm text-gray-800 opacity-60 text-center mt-5 mb-10">
            利用互联网前沿技术，帮助更多的人实现梦想
        </div>
    </div>
</template>

<script>
import Step from '@/components/Step'
export default {
    components: { Step },
    data() {
        return {
            message: ''
        }
    },
    async created() {
        this.$store.state.step = 0
        this.message = await this.axios.get(`install.php?action=welcome`)
    }
}
</script>

<style lang="scss">
body {
    background-color: #f3f3f3;
}
#app {
    width: 1030px;
}
</style>
