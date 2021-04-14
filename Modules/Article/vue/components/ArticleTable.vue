<template>
    <div>
        <div class="mb-3">
            <el-input placeholder="请输入标题关键词" v-model.trim="keyword" size="small">
                <div slot="append" @click="search" class="cursor-pointer">搜索</div>
            </el-input>
        </div>
        <el-table :data="contents.data" border stripe v-loading="loading">
            <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width" #default="{row:content}">
                <span v-if="col.id == 'created_at' || col.id == 'updated_at'">
                    {{ content[col.id] | dateFormat }}
                </span>
                <div v-else-if="col.id == 'tags'">
                    <el-tag size="mini" v-for="tag in content.tags" :key="tag.id" class="mr-2">
                        {{ tag.title }}
                    </el-tag>
                </div>
                <div v-else-if="col.id == 'preview'">
                    <el-popover placement="top-start" width="200" height="200" trigger="hover">
                        <img slot="reference" :src="content.preview" class="w-8 h-8 object-cover" />
                        <div>
                            <img :src="content.preview" class="w-full h-20 object-cover" />
                        </div>
                    </el-popover>
                </div>
                <span v-else>
                    {{ content[col.id] }}
                </span>
            </el-table-column>
            <el-table-column :width="width" #default="{row:content}" align="center">
                <slot :content="content" />
            </el-table-column>
        </el-table>
        <el-pagination
            v-if="contents.meta"
            :total="contents.meta.total"
            :page-size="contents.meta.per_page"
            :hide-on-single-page="true"
            background
            @current-change="load"
            class="mt-3"
        >
        </el-pagination>
    </div>
</template>

<script>
const columns = [
    { id: 'id', label: '编号', width: 60 },
    { id: 'title', label: '标题' },
    { id: 'tags', label: '标签' },
    { id: 'keyword', label: '微信关键词' },
    { id: 'preview', label: '缩略图', width: 100 },
    { id: 'created_at', label: '创建时间', width: 200 },
    { id: 'updated_at', label: '修改时间', width: 200 }
]
export default {
    props: {
        width: {
            default: '280'
        }
    },
    data() {
        return {
            contents: [],
            columns,
            keyword: '',
            loading: true
        }
    },
    created() {
        this.load()
    },
    methods: {
        async load(page = 1) {
            this.loading = true
            this.contents = await axios.get(`content?page=${page}&keyword=${this.keyword}`)
            this.loading = false
        },
        search() {
            if (!this.keyword) {
                return this.$message.error('关键词不能为空')
            }
            this.load()
        }
    }
}
</script>

<style></style>
