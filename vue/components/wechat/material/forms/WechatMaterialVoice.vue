<template>
    <el-form :model="material" ref="form" label-width="100px" :inline="false" size="normal">
        <el-form-item label="素材描述">
            <el-input v-model="material.title"></el-input>
            <hd-form-error name="title" />
        </el-form-item>
        <el-form-item label="素材类型">
            <el-radio-group v-model="material.duration" :disabled="!!material.id || !showDurationButton">
                <el-radio label="short">临时素材</el-radio>
                <el-radio label="long">永久素材</el-radio>
            </el-radio-group>
            <hd-form-error name="duration" />
        </el-form-item>
        <el-form-item label="语音文件">
            <hd-upload-voice v-model="material.file" :sid="wechat.site_id" />
            <hd-form-error name="file" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :disabled="isSubmit" v-loading="isSubmit">保存提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Mixin from './Mixin'
export default {
    mixins: [Mixin]
}
</script>

<style></style>
