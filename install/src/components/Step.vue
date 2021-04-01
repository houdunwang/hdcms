<template>
    <div class="p-5 border shadow-md mt-5 rounded-md bg-white">
        <el-steps :active="$store.state.step" finish-status="success" align-center process-status="finish" class="h-14 ">
            <el-step title="欢迎使用"></el-step>
            <el-step title="安装协议"></el-step>
            <el-step title="环境检测"></el-step>
            <el-step title="数据库"></el-step>
            <el-step title="完成安装"></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },

    methods: {}
}
</script>

<style></style>
