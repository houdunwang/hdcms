<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal">
            <el-form-item label="栏目选择" v-if="categories">
                <el-select v-model="form.category_id" placeholder="请选择">
                    <el-option v-for="category in categories" :key="category.id" :label="category.title" :value="category.id" :disabled="disabled(category)">
                    </el-option>
                </el-select>
            </el-form-item>
            <hd-wechat-message-module-rule :id.sync="form.wechat_id" :keyword.sync="form.keyword" />
            <el-card shadow="nerver" :body-style="{ padding: '20px' }" v-if="model" class="mt-3">
                <div slot="header">
                    <span>内容设置</span>
                </div>
                <div>
                    <el-form-item label="标签" v-if="tags.length">
                        <el-checkbox-group v-model="form.tags" size="mini" :max="3">
                            <el-checkbox-button v-for="t in tags" :label="t.id" :key="t.id">{{ t.title }}</el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                    <div v-for="(field, index) in model.fields" :key="index">
                        <el-form-item :label="field.title" v-if="field.show">
                            <component v-bind:is="`field-${field.type}`" :field="field" :form="form"></component>
                            <hd-form-error :name="field.name" />
                        </el-form-item>
                    </div>
                </div>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存提交</el-button>
                </el-form-item>
            </el-card>
        </el-form>
    </div>
</template>

<script>
const form = { category_id: null, tags: [], keyword: null, wechat_id: null }
import tabs from './tabs'
export default {
    props: ['id'],
    data() {
        return {
            form: _.merge({}, form),
            tabs,
            tags: [],
            loading: true,
            categories: null,
            model: null
        }
    },
    async created() {
        this.tags = await axios.get(`tag`)
        this.categories = await axios.get(`category`)
        if (this.id) {
            this.form = await axios.get(`content/${this.id}`)
            this.form.tags = form.tags.map(t => t.id)
        }
        this.loading = false
    },
    watch: {
        //栏目的选择修改
        'form.category_id'() {
            this.model = this.categories.find(category => category.id == this.form.category_id).model
            if (!this.id) {
                //添加时设置初始字段
                this.model.fields.forEach(field => this.$set(this.form, field.name, ''))
            }
        }
    },
    methods: {
        async onSubmit() {
            if (!this.form.category_id) {
                return this.$message.error('请选择栏目')
            }
            const url = this.id ? `content/${this.id}` : 'content'
            await axios[this.id ? 'put' : 'post'](url, this.form)
            this.router('admin.content.index')
        },
        //栏目是否可以选择
        disabled(category) {
            return category.type >= 3
        }
    }
}
</script>

<style></style>
