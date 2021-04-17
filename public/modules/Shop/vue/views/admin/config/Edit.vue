<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal" v-loading="loading">
            <el-form-item label="网站名称">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="关键词">
                <el-input v-model="form.keywords"></el-input>
            </el-form-item>
            <el-form-item label="客服电话">
                <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="网站介绍">
                <hd-wang-editor v-model="form.description" v-if="!loading" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import tabs from './tabs'
const form = { title: '', keywords: '', description: '' }
export default {
    data() {
        return { tabs, form, loading: true }
    },
    async created() {
        this.form = _.merge(this.form, await axios.get(`config`))
        this.loading = false
    },
    methods: {
        async onSubmit() {
            await axios.put(`config`, this.form)
        }
    }
}
</script>

<style></style>
