<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-alert type="info" effect="light" closable class="mb-2"> 正在编辑 【{{ attributeType.title }}】 的属性值 </el-alert>

        <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal" v-loading="loading">
            <el-form-item label="属性名称">
                <el-input v-model="form.title"></el-input>
                <hd-form-error name="title" />
            </el-form-item>
            <el-form-item label="属性名称">
                <el-radio-group v-model="form.type">
                    <el-radio
                        v-for="item in [
                            { label: '普通属性', value: 1 },
                            { label: '规格属性', value: 2 }
                        ]"
                        :key="item.value"
                        :label="item.value"
                    >
                        {{ item.label }}
                    </el-radio>
                </el-radio-group>
                <hd-form-error name="type" />
            </el-form-item>
            <el-form-item label="表单类型" size="normal">
                <el-select v-model="form.form_type" clearable filterable>
                    <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
                <hd-form-error name="form_type" />
            </el-form-item>
            <el-form-item label="列表项值" size="normal" v-if="form.form_type == 'select'">
                <el-input type="textarea" v-model="form.options" placeholder="" size="normal" clearable :rows="5"></el-input>
                <hd-form-error name="options" />
                <hd-tip>
                    每个选项为一行
                </hd-tip>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit" v-loading="isSubmit">保存提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import tabs from './tabs'
import typeOptions from './formTypes'
import _ from 'lodash'
const form = { title: '', type: 1, form_type: 'input', options: '' }
export default {
    data() {
        return { tabs, form: {}, isSubmit: false, loading: true, attributeType: {}, typeOptions }
    },
    async created() {
        this.attributeType = await axios.get(`attributeType/${this.$route.query.tid}`)
        const id = this.$route.name == 'admin.attribute.edit' ? this.$route.query.id : null
        const formData = id ? await axios.get(`type/${this.attributeType.id}/attribute/${id}`) : form
        this.form = _.cloneDeep(formData)
        this.loading = false
    },
    methods: {
        onSubmit() {
            this.isSubmit = true
            const url = `type/${this.attributeType.id}/attribute/${this.form.id ?? ''}`
            axios[this.form.id ? 'put' : 'post'](url, this.form)
                .then(_ => this.$router.push({ name: 'admin.attribute.index', query: { tid: this.attributeType.id } }))
                .finally(_ => (this.isSubmit = false))
        }
    }
}
</script>

<style></style>
