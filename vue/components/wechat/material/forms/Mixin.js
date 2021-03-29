//素材组件Mixin
export default {
    props: {
        //素材
        material: { required: true },
        //站点编号
        site_id: { required: true },
        //微信编号
        wechat_id: { default: null },
        //模块编号
        module_id: { default: '' },
        durationType: { default: 'short' },
        //素材临时、永久素材选择按钮
        showDurationButton: { type: Boolean, default: true }
    },
    data() {
        return {
            isSubmit: false,
            form: null,
            materialDialog: false
        }
    },
    created() {
        this.$store.commit('errors')
        //初始表单数据
        this.form = _.cloneDeep(this.material || { title: '', duration: this.durationType, file: '', ...this.$props, ...this.field })
    },
    methods: {
        onSubmit() {
            if (this.form.type == 'news' && this.checkNews()) {
                return this.$message.error('有文章数据不完整')
            }
            this.isSubmit = true
            const url = `/api/site/${this.site_id}/wechat/${this.wechat_id}/material/${this.form.id ?? ''}`
            const action = this.form.id ? 'put' : 'post'
            axios[action](url, this.form)
                .then(() => this.$emit('onSubmit'))
                .finally(() => (this.isSubmit = false))
        },
        //验证图文消息
        checkNews() {
            return this.form.content.some(
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
