<template>
    <div>
        <x-article-table #default="{content}" width="160">
            <el-button-group>
                <el-button type="primary" size="mini">
                    <a :href="`/Article/${hd.site.id}/content/${content.id}.html`" target="_blank" class="text-white">预览</a>
                </el-button>
                <el-button type="success" size="mini" @click="$emit('select', content)">选择</el-button>
            </el-button-group>
        </x-article-table>
    </div>
</template>

<script>
import ClipboardJS from 'clipboard'
export default {
    data() {
        return {}
    },
    async created() {
        this.$nextTick(_ => {
            new ClipboardJS('.copy')
        })
    }
}
</script>

<style></style>
