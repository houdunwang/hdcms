<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal" v-loading="loading">
            <el-form-item label="类型名称">
                <el-input v-model="form.title"></el-input>
                <hd-form-error name="title" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-loading="isSubmit">保存提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import tabs from './tabs'
const form = { title: '' }
export default {
    data() {
        return { tabs, form: {}, isSubmit: false, loading: true }
    },
    async created() {
        const id = this.$route.query.id
        this.form = id ? await axios.get(`attributeType/${id}`) : form
        this.loading = false
    },
    methods: {
        onSubmit() {
            this.isSubmit = true
            const url = `attributeType/${this.form.id ?? ''}`
            axios[this.form.id ? 'put' : 'post'](url, this.form)
                .then(_ => this.$router.push({ name: 'admin.attributetype.index' }))
                .finally(_ => (this.isSubmit = false))
        }
    }
}
</script>

<style></style>
