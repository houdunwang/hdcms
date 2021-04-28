<template>
    <div>
        <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal">
            <el-form-item label="品牌名称">
                <el-input v-model="form.title"></el-input>
                <hd-form-error name="title" />
            </el-form-item>
            <el-form-item label="品牌标志" size="normal">
                <hd-upload-image v-model="form.logo" />
                <hd-form-error name="logo" />
            </el-form-item>
            <el-form-item label="品牌描述">
                <el-input type="textarea" v-model="form.description"></el-input>
                <hd-form-error name="description" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-loading="isSubmit" :disabled="isSubmit">保存提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
const form = {
    title: '',
    description: '',
    logo: ''
}
export default {
    props: ['brand'],
    data() {
        return {
            form: _.cloneDeep(this.brand ?? form),
            isSubmit: false
        }
    },
    methods: {
        async onSubmit() {
            this.isSubmit = true
            const url = `brand/${this.form.id ?? ''}`
            axios[this.form.id ? 'put' : 'post'](url, this.form)
                .then(_ => {
                    this.$router.push({ name: 'admin.brand.index' })
                })
                .finally(_ => {
                    this.isSubmit = false
                })
        }
    }
}
</script>

<style></style>
