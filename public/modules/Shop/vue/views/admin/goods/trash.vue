<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-goods-list #default="{goods}" action="goods?del=1">
            <el-button-group>
                <el-button type="primary" size="mini" @click="change(goods)">恢复</el-button>
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
                axios.delete(`goods/${goods.id}?force=1`)
                this.$router.go(0)
            })
        },
        change(goods) {
            this.$confirm(`确定恢复【${goods.title}】商品吗？`, '温馨提示').then(async _ => {
                await axios.get(`goods_reset/${goods.id}`)
                this.$router.go(0)
            })
        }
    }
}
</script>

<style></style>
