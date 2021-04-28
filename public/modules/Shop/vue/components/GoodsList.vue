<template>
    <div>
        <el-table :data="lists.data" border stripe v-loading="loading">
            <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" #default="{row}" :align="col.align">
                <template v-if="col.id == 'preview'">
                    <el-popover width="200" trigger="hover">
                        <el-image :src="row.preview" fit="cover"></el-image>
                        <el-image slot="reference" :src="row.preview" fit="cover" class="w-10 h-10"></el-image>
                    </el-popover>
                </template>
                <template v-else-if="col.id == 'user'">
                    {{ row.user.name }}
                </template>
                <template v-else-if="col.id == 'category'">
                    {{ row.category.title }}
                </template>
                <template v-else-if="col.id == 'is_commend'">
                    <i class="fas fa-check-circle text-green-600" v-if="row.is_commend"></i>
                </template>
                <template v-else-if="col.id == 'state'">
                    <i class="fas fa-check-circle text-green-600" v-if="row.state"></i>
                </template>
                <template v-else>
                    {{ row[col.id] }}
                </template>
            </el-table-column>
            <el-table-column :width="width" #default="{row}" align="left">
                <slot :goods="row"></slot>
            </el-table-column>
        </el-table>
        <el-pagination
            @current-change="load"
            layout="total, prev, pager, next, jumper"
            :page-size="lists.meta.per_page"
            :total="lists.meta.total"
            :hide-on-single-page="true"
            background
            class="mt-3"
            v-if="lists.meta"
        >
        </el-pagination>
    </div>
</template>

<script>
const columns = [
    { label: '编号', id: 'id', width: 60, align: 'center' },
    { label: '货号', id: 'sn', width: 200 },
    { label: '操作员', id: 'user', width: 100 },
    { label: '商品名称', id: 'title' },
    { label: '栏目', id: 'category' },
    { label: '上架', id: 'state', width: 60, align: 'center' },
    { label: '推荐', id: 'is_commend', width: 60, align: 'center' },
    { label: '库存', id: 'number' },
    { label: '价格', id: 'price' },
    { label: '市场价格', id: 'market_price' },
    { label: '商品图片', id: 'preview', width: 100 }
]
export default {
    props: { action: { type: String }, width: { type: Number, default: 160 } },
    data() {
        return { lists: { data: [], meta: null }, loading: true, columns }
    },
    created() {
        this.load()
    },
    methods: {
        async load(page = 1) {
            this.loading = true
            const url = this.action ? `${this.action}&${page}` : `goods?page=${page}`
            this.lists = await axios.get(url)
            this.loading = false
        }
    }
}
</script>

<style></style>
