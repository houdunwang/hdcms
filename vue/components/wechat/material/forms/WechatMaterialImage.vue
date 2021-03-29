<template>
    <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal">
        <el-form-item label="素材描述">
            <el-input v-model="form.title"></el-input>
            <hd-form-error name="title" />
        </el-form-item>
        <el-form-item label="素材类型">
            <el-radio-group v-model="form.duration" :disabled="!!form.id || !showDurationButton">
                <el-radio label="short">临时素材</el-radio>
                <el-radio label="long">永久素材</el-radio>
            </el-radio-group>
            <hd-form-error name="duration" />
        </el-form-item>
        <el-form-item label="素材图片">
            <hd-upload-image v-model="form.file" :sid="site_id" />
            <hd-form-error name="file" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isSubmit" v-loading="isSubmit">保存提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import mixin from './mixin'
export default {
    mixins: [mixin],
    data() {
        return {
            field: { type: 'image' }
        }
    }
}
</script>

<style></style>
