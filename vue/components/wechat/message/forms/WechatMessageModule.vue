<template>
    <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal">
        <hd-wechat-message-rule :form="form" />
        <el-card shadow="nerver" :body-style="{ padding: '20px' }">
            <div slot="header">
                处理模块
            </div>
            <div>
                <el-radio-group v-model="form.module_id" size="mini">
                    <el-radio-button :label="module.id" v-for="module in modules" :key="module.id">
                        {{ module.title }}
                    </el-radio-button>
                </el-radio-group>
            </div>
        </el-card>
        <el-button type="primary" @click="onSubmit" :disabled="isSubmit" v-loading="isSubmit" class="block mt-3">保存提交</el-button>
    </el-form>
</template>

<script>
import mixin from './mixin'
export default {
    mixins: [mixin],
    data() {
        return {
            modules: [],
            field: { type: 'module', content: [] }
        }
    },
    async created() {
        this.modules = await axios.get(`/api/module/site/${this.site_id}`)
    }
}
</script>
