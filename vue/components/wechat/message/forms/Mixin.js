export default {
    props: {
        //消息
        message: { default: null },
        //站点编号
        site_id: { required: true },
        //微信编号
        wechat_id: { default: null },
        //模块编号
        module_id: { default: '' }
    },
    data() {
        return {
            isSubmit: false,
            form: null,
            //选择素材dialog
            materialDialogShow: false
        }
    },
    created() {
        this.$store.commit('errors')
        //初始表单数据
        this.form = _.cloneDeep(this.message || { title: '', keyword: '', file: '', ...this.$props, ...this.field })
    },
    methods: {
        //提交表单
        async onSubmit() {
            this.isSubmit = true
            const url = `/api/site/${this.site_id}/wechat/${this.wechat_id}/message/${this.form.id ?? ''}`
            const action = this.form.id ? 'put' : 'post'
            axios[action](url, this.form)
                .then(_ => this.$emit('onSubmit'))
                .finally(_ => (this.isSubmit = false))
        },
        //选择素材
        selectMaterial(material) {
            this.form.file = material.file
            this.form.content.media_id = material.response.media_id
            this.materialDialogShow = false
        }
    }
}
