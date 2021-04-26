<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-goods-list #default="{goods}">
            <el-button-group>
                <el-button type="success" size="mini" @click="$router.push({ name: 'admin.goods.edit', params: { id: goods.id } })">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(goods)">删除</el-button>
            </el-button-group>
        </x-goods-list>
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return { tabs }
    },
    methods: {
        del(goods) {
            this.$confirm('确定删除吗？', '温馨提示').then(_ => {
                axios.delete(`goods/${goods.id}`)
                this.$router.go(0)
            })
        }
    }
}
</script>

<style></style>
