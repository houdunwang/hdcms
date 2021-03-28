//素材组件Mixin
export default {
    props: {
        //公众号
        wechat: { required: true, type: Object },
        //素材
        material: { default: null },
        //素材临时、永久素材选择按钮
        showDurationButton: { type: Boolean, default: true }
    },
    data() {
        return {
            //提交动作
            isSubmit: false,
            //临时或永久类型
            duration: this.durationType
        }
    },
    methods: {
        onSubmit() {
            if (this.material.type == 'news' && this.checkNews()) {
                return this.$message.error('有文章数据不完整')
            }
            this.isSubmit = true
            const url = `site/${this.wechat.site_id}/wechat/${this.wechat.id}/material` + (this.material.id ? `/${this.material.id}` : ``)
            axios[this.material.id ? 'put' : 'post'](url, this.material)
                .then(() => {
                    this.$emit('onSubmit')
                })
                .finally(() => {
                    this.isSubmit = false
                })
        },
        //验证图文消息
        checkNews() {
            return this.material.content.some(
                content =>
                    !content['title'] ||
                    !content['thumb_media_id'] ||
                    !content['author'] ||
                    !content['digest'] ||
                    !content['content'] ||
                    !content['content_source_url']
            )
        }
    }
}
