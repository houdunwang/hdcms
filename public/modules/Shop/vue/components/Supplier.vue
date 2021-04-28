<template>
    <div>
        <el-table :data="suppliers.data" border stripe v-loading="loading">
            <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" #default="{row}" :align="col.align">
                <template v-if="col.id == 'logo'">
                    <el-image :src="row.logo" fit="cover" :lazy="true" class="w-10 h-10"></el-image>
                </template>
                <template v-else-if="col.id == 'user'">
                    {{ row.user.name }}
                </template>
                <template v-else>
                    {{ row[col.id] }}
                </template>
            </el-table-column>
            <el-table-column :width="width" #default="{row}" align="center">
                <slot :supplier="row"></slot>
            </el-table-column>
        </el-table>

        <el-pagination
            v-if="suppliers.meta"
            class="mt-3"
            @current-change="load"
            :hide-on-single-page="true"
            :page-size="suppliers.meta.per_page"
            layout="total, prev, pager, next, jumper"
            :total="suppliers.meta.total"
            background
        >
        </el-pagination>
    </div>
</template>

<script>
const columns = [
    { label: '编号', id: 'id', width: 60 },
    { label: '供货商名称', id: 'title' },
    { label: '供货商介绍 ', id: 'description' },
    { label: '操作员', id: 'user' }
]
export default {
    props: { width: { type: Number, default: 160 } },
    data() {
        return { suppliers: { data: [] }, columns, loading: true }
    },
    async created() {
        this.load()
    },
    methods: {
        async load(page = 1) {
            this.loading = true
            this.suppliers = await axios.get(`supplier?page=${page}`)
            this.loading = false
        }
    }
}
</script>

<style></style>
