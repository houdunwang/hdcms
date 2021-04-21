<template>
    <div>
        <hd-tab :tabs="tabs" />
        <el-form :model="form" ref="form" label-width="80px" :inline="false" size="normal" v-loading="loading">
            <el-tabs value="base" type="border-card" tab-position="top" class="shadow-none">
                <el-tab-pane label="基本配置" name="base">
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
                </el-tab-pane>

                <el-tab-pane label="商品相关" name="goods">
                    <el-form-item label="图片宽度">
                        <el-input type="number" v-model="form.goods.thumb_width"></el-input>
                    </el-form-item>
                    <el-form-item label="图片高度">
                        <el-input type="number" v-model="form.goods.thumb_height"></el-input>
                    </el-form-item>
                </el-tab-pane>
            </el-tabs>

            <div class="mt-3">
                <el-button type="primary" @click="onSubmit">保存提交</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
import tabs from './tabs'
const form = { title: '', keywords: '', description: '', goods: { thumb_width: 300, thumb_height: 300 } }
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
