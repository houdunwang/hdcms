<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-supplier #default="{supplier}">
            <el-button-group>
                <el-button type="success" size="mini" @click="$router.push({ name: `admin.supplier.edit`, query: { id: supplier.id } })">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(supplier)">删除</el-button>
            </el-button-group>
        </x-supplier>
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return { tabs }
    },
    methods: {
        async del(supplier) {
            this.$confirm('确定删除吗?', '温馨提示').then(_ => {
                axios.delete(`supplier/${supplier.id}`).then(_ => {
                    this.$router.go(0)
                })
            })
        }
    }
}
</script>

<style></style>
