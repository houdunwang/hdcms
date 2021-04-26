<template>
    <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal">
        <el-form-item label="供货商名称">
            <el-input v-model="form.title"></el-input>
            <hd-form-error name="title" />
        </el-form-item>
        <el-form-item label="供货商介绍">
            <el-input type="textarea" v-model="form.description"></el-input>
            <hd-form-error name="description" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">保存提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
const form = { title: '', description: '' }
export default {
    props: ['supplier'],
    data() {
        return { form: _.cloneDeep(this.supplier ?? form) }
    },
    methods: {
        async onSubmit() {
            const url = `supplier/${this.form.id ?? ''}`
            axios[this.form.id ? 'put' : 'post'](url, this.form).then(_ => {
                this.$router.push({ name: 'admin.supplier.index' })
            })
        }
    }
}
</script>

<style></style>
