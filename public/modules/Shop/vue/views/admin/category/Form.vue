<template>
    <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal" v-loading="loading">
        <el-form-item label="栏目标题">
            <el-input v-model="form.title"></el-input>
            <hd-form-error name="title" />
        </el-form-item>
        <el-form-item label="父级栏目" size="normal">
            <el-select v-model="form.pid" placeholder="选择栏目" clearable filterable v-if="categories">
                <el-option :value="0" label="顶级栏目"></el-option>
                <el-option
                    v-for="item in categories"
                    :key="item.id"
                    :label="item.levelTitle"
                    :value="item.id"
                    :disabled="item.disabled"
                    :selected="form.pid == item.id"
                >
                </el-option>
            </el-select>
            <hd-form-error name="pid" />
        </el-form-item>
        <el-form-item label="推荐">
            <el-radio-group v-model="form.is_commend" size="mini">
                <el-radio-button
                    v-for="(item, index) in [
                        { label: '是', value: true },
                        { label: '否', value: false }
                    ]"
                    :key="index"
                    :label="item.value"
                >
                    {{ item.label }}
                </el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="商品单位" size="normal">
            <el-input v-model="form.unit" placeholder="" size="normal" clearable></el-input>
            <hd-form-error name="unit" />
        </el-form-item>
        <el-form-item label="预览图">
            <hd-upload-image v-model="form.preview" />
            <hd-form-error name="preview" />
        </el-form-item>
        <el-form-item label="关键词">
            <el-input v-model="form.keywords"></el-input>
            <hd-form-error name="keywords" />
        </el-form-item>
        <el-form-item label="栏目简介">
            <el-input type="textarea" v-model="form.description"></el-input>
            <hd-form-error name="description" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isSubmit">保存提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
const form = { title: '', preview: '', description: '', is_commend: false, is_show: true, pid: 0, unit: '件' }
export default {
    props: ['category'],
    data() {
        return {
            form: Object.assign({}, this.category ?? form),
            isSubmit: false,
            categories: null,
            loading: true
        }
    },
    async created() {
        this.categories = this.formatCategory(await axios.get(`category`))
        this.loading = false
    },
    methods: {
        formatCategory(categories) {
            return categories.map(c => {
                c.disabled = c.id == this.form.id || c.path.includes(this.form.path + '-' + this.form.id)
                return c
            })
        },
        async onSubmit() {
            this.isSubmit = true
            const isEdit = this.form.id
            const url = isEdit ? `category/${this.form.id}` : `category`
            await axios[isEdit ? 'put' : 'post'](url, this.form)
                .then(() => this.$router.push({ name: `admin.category.index` }))
                .finally(() => (this.isSubmit = false))
        }
    }
}
</script>

<style></style>
