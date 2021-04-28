<template>
    <div>
        <hd-tab :tabs="tabs" />

        <x-brand #default="{brand}">
            <el-button-group>
                <el-button type="success" size="mini" @click="$router.push({ name: `admin.brand.edit`, query: { id: brand.id } })">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(brand)">删除</el-button>
            </el-button-group>
        </x-brand>
    </div>
</template>

<script>
import tabs from './tabs'
export default {
    data() {
        return { tabs }
    },
    methods: {
        async del(brand) {
            this.$confirm('确定删除吗?', '温馨提示').then(_ => {
                axios.delete(`brand/${brand.id}`).then(_ => {
                    const index = this.brands.data.indexOf(brand)
                    this.brands.data.splice(index, 1)
                })
            })
        }
    }
}
</script>

<style></style>
