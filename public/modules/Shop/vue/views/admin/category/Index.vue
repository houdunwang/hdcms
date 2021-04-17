<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-table :data="categories" border stripe v-loading="loading">
            <el-table-column
                v-for="col in columns"
                :prop="col.id"
                :key="col.id"
                :label="col.label"
                :width="col.width"
                #default="{row}"
                :align="col.align || 'left'"
            >
                <template v-if="col.id == 'levelTitle'">
                    {{ row.levelTitle }}
                </template>
                <template v-else-if="col.id == 'is_show'">
                    <i class="fas fa-check-circle text-green-600 cursor-pointer" v-if="row.is_show" @click="setShow(row)"></i>
                    <i class="fas fa-times-circle cursor-pointer" v-else @click="setShow(row)"></i>
                </template>
                <template v-else-if="col.id == 'preview'">
                    <el-popover placement="top" width="200" trigger="hover">
                        <el-image :src="row.preview" fit="cover" class="w-full"></el-image>
                        <el-image slot="reference" :src="row.preview" fit="cover" :lazy="true" class="w-10 h-10"></el-image>
                    </el-popover>
                </template>
                <template v-else>
                    {{ row[col.id] }}
                </template>
            </el-table-column>
            <el-table-column width="180" align="center" #default="{row}">
                <el-button-group>
                    <el-button type="success" size="mini" @click="hd.router(`admin.category.edit`, {}, { id: row.id })">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(row)">删除</el-button>
                </el-button-group>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import tabs from './tabs'
const columns = [
    { label: '编号', id: 'id', align: 'center', width: 80 },
    { label: '栏目名称', id: 'levelTitle' },
    { label: '是否显示', id: 'is_show', align: 'center', width: 100 },
    { label: '单位', id: 'unit', align: 'center', width: 100 },
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
        async setShow(category) {
            category.is_show = !category.is_show
            await axios.put(`category/${category.id}`, category)
        }
    }
}
</script>

<style></style>
