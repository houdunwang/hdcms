<template>
    <div class="home">
        <div class="mt-5">
            <h2 class="text-gray-600 opacity-90 text-center pb-3">环境检测</h2>
            <div class="text-gray-800 opacity-70 mb-2 font-bold">目录检测</div>

            <el-table :data="env.dirs" border stripe>
                <el-table-column label="目录" #default="{row:dir}">{{ dir.name }}</el-table-column>
                <el-table-column label="检测结果" #default="{row:dir}">
                    <i class="fas fa-check-circle text-green-600" v-if="dir.state"></i>
                    <i class="fas fa-times-circle" v-else></i>
                </el-table-column>
            </el-table>

            <div class="text-gray-800 opacity-70 mb-2 font-bold mt-5">扩展检测</div>
            <el-table :data="env.exts" border stripe>
                <el-table-column label="目录" #default="{row:ext}">{{ ext.name }}</el-table-column>
                <el-table-column label="检测结果" #default="{row:ext}">
                    <i class="fas fa-check-circle text-green-600" v-if="ext.state"></i>
                    <i class="fas fa-times-circle" v-else></i>
                </el-table-column>
            </el-table>

            <div class="flex justify-center mt-10">
                <el-button type="success" size="default" @click="$router.push({ name: 'copyright' })">上一步</el-button>
                <el-button plain disabled v-if="invalid">下一步</el-button>
                <el-button type="primary" size="default" @click="$router.push({ name: 'database' })" v-else>下一步</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return { env: { dirs: [], exts: [] } }
    },
    computed: {
        invalid() {
            return this.env.dirs.some(d => d.state == false) || this.env.exts.some(d => d.state == false)
        }
    },
    async created() {
        this.$store.state.step = 2
        this.env = await this.axios.get(`install.php?action=env`)
    }
}
</script>

<style>
.copyright {
    text-indent: 2rem;
}
</style>
