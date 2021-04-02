<template>
    <div class="home">
        <h1 class="text-red-500 opacity-80 text-center text-lg font-bold my-5">恭喜您！安装已经完成</h1>
        <div class="flex flex-col justify-center items-center">
            <el-button type="primary" size="default" @click="go">访问后台</el-button>
            <div class="text-center text-gray-800 opacity-70 font-bold text-sm mt-6 mb-5">
                帐号: admin@houdunren.com 密码:admin888
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.state.step = 5
        this.axios.get(`install.php?action=done`)
    },
    methods: {
        go() {
            location.href = '/admin'
        }
    }
}
</script>
