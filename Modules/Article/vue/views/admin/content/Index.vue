<template>
    <div>
        <hd-tab :tabs="tabs" />
        <x-article-table :data="contents.data" v-loading="loading" #default="{content}">
            <el-button-group>
                <el-button type="primary" size="mini">
                    <a :href="`/Article/${hd.site.id}/content/${content.id}.html`" target="_blank" class="text-white">预览</a>
                </el-button>
                <el-button type="success" size="mini" @click="$router.push({ name: 'admin.content.edit', params: { id: content.id } })">编辑</el-button>
                <el-button type="danger" size="mini" @click="del(content)">删除</el-button>
                <el-button type="warning" size="mini" class="copy" :data-clipboard-text="`/Article/content/${content.id}.html`">
                    复制链接
                </el-button>
            </el-button-group>
        </x-article-table>
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
import ClipboardJS from 'clipboard'

import tabs from './tabs'
export default {
    route: { path: `/Article/site/${hd.site.id}/admin`, meta: { title: '文章列表' } },
    data() {
        return { tabs, contents: [], loading: true }
    },
    async created() {
        this.load()
        this.$nextTick(_ => {
            new ClipboardJS('.copy')
        })
    },
    methods: {
        async load(page = 1) {
            this.loading = true
            this.contents = await axios.get(`content?page=${page}`)
            this.loading = false
        },
        async del(content) {
            this.$confirm(`确定删除【${content.title}】吗？`, '温馨提示').then(async _ => {
                await axios.delete(`content/${content.id}`)
                this.contents.data.splice(this.contents.data.indexOf(content), 1)
            })
        }
    }
}
</script>

<style></style>
