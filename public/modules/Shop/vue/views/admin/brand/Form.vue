<template>
    <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal">
        <el-form-item label="品牌名称">
            <el-input v-model="form.title"></el-input>
            <hd-form-error name="title" />
        </el-form-item>
        <el-form-item label="品牌标志">
            <hd-upload-image v-model="form.logo" />
            <hd-form-error name="logo" />
        </el-form-item>
        <el-form-item label="品牌介绍">
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
    props: ['brand'],
    data() {
        return { form: _.cloneDeep(this.brand, form) }
    },
    methods: {
        async onSubmit() {
            const url = `brand/${this.form.id ?? ''}`
            axios[this.form.id ? 'put' : 'post'](url, this.form).then(_ => {
                this.$router.push({ name: 'admin.brand.index' })
            })
        }
    }
}
</script>

<style></style>
