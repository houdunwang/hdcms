<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-table :data="attributeTypes" border stripe v-loading="loading">
            <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width"> </el-table-column>
            <el-table-column :width="200" #default="{row}">
                <el-button-group>
                    <el-button type="info" size="mini" @click="$router.push({ name: 'admin.attribute.index', query: { tid: row.id } })">属性值</el-button>
                    <el-button type="success" size="mini" @click="$router.push({ name: 'admin.attributetype.edit', query: { id: row.id } })">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
                </el-button-group>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import tabs from './tabs'
const columns = [
    { label: '编号', id: 'id', width: 80 },
    { label: '类型', id: 'title' }
]
export default {
    data() {
        return { tabs, attributeTypes: [], loading: true, columns }
    },
    async created() {
        this.attributeTypes = await axios.get(`attributeType`)
        this.loading = false
    },
    methods: {
        del(attributeType) {
            this.$confirm('确定删除吗？', '温馨提示').then(_ => {
                axios.delete(`attributeType/${attributeType.id}`)
                this.attributeTypes.splice(this.attributeTypes.indexOf(attributeType), 1)
            })
        }
    }
}
</script>

<style></style>
