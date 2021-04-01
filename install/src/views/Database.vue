<template>
    <div class="home">
        <div class="mt-5">
            <h2 class="text-gray-600 opacity-90 text-center pb-3 text-xl">数据库连接</h2>
            <el-form :model="form" ref="form" :rules="rules" label-width="100px" :inline="false" size="normal" class="w-3/5 m-auto">
                <el-form-item label="主机地址" prop="host">
                    <el-input v-model="form.host"></el-input>
                </el-form-item>
                <el-form-item label="连接端口" prop="port">
                    <el-input v-model="form.port"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="user">
                    <el-input v-model="form.user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="数据库" prop="database">
                    <el-input v-model="form.database"></el-input>
                </el-form-item>
            </el-form>
            <div class="flex justify-center mt-10">
                <el-button type="danger" size="default" @click="connection">测试连接</el-button>
                <el-button type="success" size="default" @click="$router.push({ name: 'env' })">上一步</el-button>
                <el-button type="primary" @click="$router.push({ name: 'env' })" v-if="isConnection">下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
const form = { host: '192.168.10.10', port: 3306, user: 'homestead', password: 'secret', database: 'hdcms' }
const rules = {
    host: [{ required: true, message: '请输入主机地址', trigger: 'blur' }],
    port: [{ required: true, message: '连接端口', trigger: 'blur' }],
    user: [{ required: true, message: '用户名', trigger: 'blur' }],
    password: [{ required: true, message: '密码', trigger: 'blur' }],
    database: [{ required: true, message: '数据库', trigger: 'blur' }]
}
export default {
    data() {
        return {
            form,
            rules,
            isConnection: false
        }
    },
    created() {
        this.$store.state.step = 3
    },
    methods: {
        async connection() {
            this.isConnection = false
            const state = await this.axios.post(`install.php?action=connection`, this.form)
            if (state == 'success') {
                this.$message.success('连接成功')
                this.isConnection = true
            }
        }
    }
}
</script>

<style>
.copyright {
    text-indent: 2rem;
}
</style>
