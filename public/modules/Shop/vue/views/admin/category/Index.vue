<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-table :data="categories" border stripe v-loading="loading">
            <el-table-column
                v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :width="col.width"
                :align="col.align || 'left'"
                #default="{row}"
                :label="col.label"
            >
                <template v-if="col.id == 'preview'">
                    <el-popover placement="top" width="200" trigger="hover">
                        <el-image :src="row.preview" fit="cover" class="w-200"></el-image>
                        <el-image slot="reference" :src="row.preview" fit="cover" :lazy="true" class="w-10 h-10"></el-image>
                    </el-popover>
                </template>
                <template v-else-if="col.id == 'is_show'">
                    <div @click="setShow(row)">
                        <i class="fas fa-check-circle text-green-600 cursor-pointer" v-if="row.is_show"></i>
                        <i class="fas fa-times-circle cursor-pointer" v-else></i>
                    </div>
                </template>
                <template v-else>
                    {{ row[col.id] }}
                </template>
            </el-table-column>
            <el-table-column width="180" align="center" #default="{row}">
                <el-button-group>
                    <el-button type="primary" size="mini" @click="hd.router(`admin.category.edit`, {}, { id: row.id })">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
                </el-button-group>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import tabs from './tabs'
const columns = [
    { label: '编号', id: 'id', width: 60 },
    { label: '栏目名称', id: 'levelTitle' },
    { label: '显示', id: 'is_show', width: 200, align: 'center' },
    { label: '缩略图', id: 'preview', width: 100, align: 'center' },
    { label: '单位', id: 'unit', width: 100, align: 'center' },
    { label: '商品数量', id: 'goods_num', align: 'center', width: 100 }
]
export default {
    route: { path: '/', meta: { auth: true } },
    data() {
        return { tabs, columns, categories: [], loading: true }
    },
    async created() {
        this.categories = await axios.get(`category`)
        this.loading = false
    },
    methods: {
        async del(category) {
            this.$confirm(`确定删除【${category.title}】栏目吗？`, '温馨提示')
                .then(async () => {
                    await axios.delete(`category/${category.id}`)
                    this.categories.splice(this.categories.indexOf(category), 1)
                })
                .catch(async () => {})
        },
        //改变显示状态
        async setShow(category) {
            category.is_show = !category.is_show
            await axios.put(`category/${category.id}`, category)
        }
    }
}
</script>

<style></style>
