<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-table :data="suppliers.data" border stripe v-loading="loading">
            <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" #default="{row}">
                <template v-if="col.id == 'logo'">
                    <el-image :src="row.logo" fit="cover" class="h-10"></el-image>
                </template>
                <template v-else-if="col.id == 'user'">
                    {{ row.user.name }}
                </template>
                <template v-else>
                    {{ row[col.id] }}
                </template>
            </el-table-column>
            <el-table-column width="160" #default="{row}" align="center">
                <el-button-group>
                    <el-button type="success" size="mini" @click="$router.push({ name: 'admin.supplier.edit', query: { id: row.id } })">编辑</el-button>
                    <el-button type="primary" size="mini" @click="del(row)">删除</el-button>
                </el-button-group>
            </el-table-column>
        </el-table>
        <el-pagination
            class="mt-3"
            v-if="suppliers.meta"
            @current-change="load"
            :page-size="suppliers.meta.per_page"
            layout="total, prev, pager, next, jumper"
            :total="suppliers.meta.total"
            background
        >
        </el-pagination>
    </div>
</template>

<script>
import tabs from './tabs'
const columns = [
    { label: '编号', id: 'id', width: 60 },
    { label: '供货商', id: 'title' },
    { label: '供货商介绍', id: 'description' },
    { label: '操作员', id: 'user', width: 150 }
]
export default {
    data() {
        return { tabs, suppliers: { data: [] }, columns, loading: true }
    },
    created() {
        this.load()
    },
    methods: {
        async load(page = 1) {
            this.loading = true
            this.suppliers = await axios.get(`supplier?page=${page}`)
            this.loading = false
        },
        del(brand) {
            this.$confirm('确定删除吗?', '温馨提示').then(_ => {
                axios.delete(`brand/${brand.id}`)
                this.suppliers.data.splice(this.suppliers.data.indexOf(brand), 1)
            })
        }
    }
}
</script>

<style></style>
