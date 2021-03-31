<template>
    <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal">
        <el-card shadow="never" :body-style="{ padding: '10px' }" class="mb-3">
            <div slot="header">
                微信关键词
            </div>
            <el-form-item label="公众号" size="normal">
                <el-radio-group v-model="form.id" size="mini" @change="$emit('update:id', $event)">
                    <el-radio-button :label="wechat.id" v-for="wechat in wechats" :key="wechat.id">
                        {{ wechat.title }}
                    </el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="form.keyword" @input="$emit('update:keyword', $event)"></el-input>
                <hd-form-error name="keyword" />
            </el-form-item>
        </el-card>
    </el-form>
</template>

<script>
export default {
    props: ['id', 'keyword'],
    data() {
        return {
            form: { id: this.id, keyword: this.keyword },
            wechats: []
        }
    },
    created() {
        this.loadWechats()
    },
    methods: {
        async loadWechats() {
            const url = `/api/site/${this.hd.site.id}/wechat`
            this.wechats = await axios.get(url)
        }
    }
}
</script>

<style></style>
