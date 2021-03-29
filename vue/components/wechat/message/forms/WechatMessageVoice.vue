<template>
    <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal">
        <hd-wechat-message-rule :form="form" />
        <el-card shadow="nerver" :body-style="{ padding: '20px' }">
            <div slot="header">
                音频资料
            </div>
            <div>
                <audio controls preload="auto" class="relative outline-none w-60 h-10" v-if="form.file" style="background-color: #f3f3f3;">
                    <source :src="form.file" type="audio/mp3" />
                </audio>
                <el-dialog title="选择素材" :visible.sync="materialDialogShow" width="60%" :append-to-body="true">
                    <hd-wechat-material
                        :site_id="site_id"
                        :wechat_id="wechat_id"
                        :show-wechat-button="false"
                        :show-type-button="false"
                        material-type="voice"
                        #default="{material}"
                    >
                        <el-button type="primary" size="mini" @click="selectMaterial(material)">选择</el-button>
                    </hd-wechat-material>
                </el-dialog>
                <el-button size="mini" @click="materialDialogShow = true" class="mt-3 block">选择素材</el-button>
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
            field: { type: 'voice', content: { media_id: '' } }
        }
    }
}
</script>
