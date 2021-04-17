<template>
    <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal" v-loading="isLoading">
        <el-form-item label="栏目标题">
            <el-input v-model="form.title"></el-input>
            <hd-form-error name="title" />
        </el-form-item>
        <el-form-item label="父级栏目" size="normal">
            <el-select v-model="form.pid" placeholder="请选择" v-if="categories">
                <el-option label="顶级栏目" :value="0"></el-option>
                <el-option
                    v-for="category in categories"
                    :key="category.id"
                    :label="category.levelTitle"
                    :value="category.id"
                    :disabled="category.disabled"
                    :selected="category.id == form.pid"
                >
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="预览图">
            <hd-upload-image v-model="form.preview" />
            <hd-form-error name="preview" />
        </el-form-item>
        <el-form-item label="商品单位" size="normal">
            <el-input v-model="form.unit" placeholder="商品单位" size="normal"></el-input>
            <hd-form-error name="unit" />
        </el-form-item>
        <el-form-item label="是否显示" size="normal">
            <el-radio-group v-model="form.is_show" size="mini">
                <el-radio-button
                    v-for="(item, index) in [
                        { label: '显示', value: true },
                        { label: '隐藏', value: false }
                    ]"
                    :key="index"
                    :label="item.value"
                >
                    {{ item.label }}
                </el-radio-button>
            </el-radio-group>
            <hd-form-error name="is_show" />
        </el-form-item>
        <el-form-item label="关键词" size="mini">
            <el-input v-model="form.keywords" placeholder="" size="normal"></el-input>
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
const form = { title: '', preview: '', description: '', pid: 0, is_show: true, keywords: '', description: '', unit: '件' }

export default {
    props: ['category'],
    data() {
        return {
            form: Object.assign({}, this.category || form),
            isSubmit: false,
            categories: null,
            isLoading: true
        }
    },
    async created() {
        const categories = await axios.get(`category`)
        this.categories = this.format(categories)
        this.isLoading = false
    },
    methods: {
        format(categories) {
            return categories.map(category => {
                if (this.form.id) {
                    category.disabled = category.path.includes(this.form.id) || this.form.id == category.id
                }
                return category
            })
        },
        async onSubmit() {
            this.isSubmit = true
            const isEdit = this.form.id
            const url = isEdit ? `category/${this.form.id}` : `category`
            await axios[isEdit ? 'put' : 'post'](url, this.form)
                .then(_ => this.$router.push({ name: `admin.category.index` }))
                .finally(() => (this.isSubmit = false))
        }
    }
}
</script>

<style></style>
