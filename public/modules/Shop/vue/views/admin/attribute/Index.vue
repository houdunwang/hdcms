<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-alert type="info" effect="light" closable class="mb-2"> 正在管理【{{ attributeType.title }}】的属性值 </el-alert>

        <el-table :data="attributes" border stripe v-loading="loading">
            <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" #default="{row}">
                <template v-if="col.id == 'type'">
                    {{ row[col.id] == 1 ? '普通属性' : '商品规格' }}
                </template>
                <template v-else-if="col.id == 'form_type'">
                    {{ formTypeTitle(row) }}
                </template>
                <template v-else>
                    {{ row[col.id] }}
                </template>
            </el-table-column>
            <el-table-column :width="150" #default="{row}" align="center">
                <el-button-group>
                    <el-button type="success" size="mini" @click="$router.push({ name: 'admin.attribute.edit', query: { tid: $route.query.tid, id: row.id } })"
                        >编辑</el-button
                    >
                    <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
                </el-button-group>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import tabs from './tabs'
import formTypes from './formTypes'
const columns = [
    { label: '编号', id: 'id', width: 80 },
    { label: '属性名称', id: 'title' },
    { label: '类型', id: 'type' },
    { label: '表单样式', id: 'form_type' }
]
export default {
    data() {
        return { tabs, attributes: [], loading: true, columns, attributeType: {}, formTypes }
    },
    async created() {
        this.attributeType = await axios.get(`attributeType/${this.$route.query.tid}`)
        this.attributes = await axios.get(`type/${this.attributeType.id}/attribute
        `)
        this.loading = false
    },
    methods: {
        formTypeTitle(attribute) {
            return formTypes.find(f => f.value == attribute.form_type).label
        },
        del(attributeType) {
            this.$confirm('确定删除吗？', '温馨提示').then(_ => {
                axios.delete(`attributeType/${attributeType.id}`)
                this.attributes.splice(this.attributes.indexOf(attributeType), 1)
            })
        }
    }
}
</script>

<style></style>
