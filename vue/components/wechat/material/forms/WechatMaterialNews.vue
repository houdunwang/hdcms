<template>
    <el-dialog title="图文素材设置" :visible.sync="dialogShow" width="70%" top="1rem" :append-to-body="true" :close-on-click-modal="false">
        <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal">
            <el-card shadow="nerver" :body-style="{ padding: '20px' }">
                <el-form-item label="素材描述">
                    <el-input v-model="form.title"></el-input>
                    <hd-form-error name="form.title" />
                </el-form-item>
                <div class="flex">
                    <div class="w-60 preview">
                        <draggable v-model="form.content">
                            <div
                                v-for="(art, index) in form.content"
                                :key="index"
                                class="border border-gray-200 mb-1 cursor-pointer flex"
                                :class="{ ' p-2 items-start': index, 'border-green-600': article == art, 'flex-col': !index }"
                                @click="edit(art)"
                            >
                                <el-image
                                    :src="art.pic || `/images/nopic480x310.jpg`"
                                    fit="cover"
                                    :class="{ 'w-1/3 order-2': index }"
                                    class="border"
                                ></el-image>
                                <div :class="{ 'w-2/3 flex-1 pr-2': index }">
                                    <div class="bg-gray-500 font-light p-1 text-white flex justify-center items-center text-sm" v-if="!index">
                                        {{ art.title }}
                                    </div>
                                    <div class="text-gray-500 font-light text-xs leading-snug" v-else>
                                        {{ art.digest | truncate(30) }}
                                    </div>
                                </div>
                            </div>
                        </draggable>
                        <el-button type="primary" size="mini" @click="add">添加图文</el-button>
                    </div>
                    <div class="flex-1 pl-3" v-if="article">
                        <el-card shadow="nerver" :body-style="{ padding: '20px' }">
                            <el-form-item label="文章标题">
                                <el-input v-model="article.title"></el-input>
                            </el-form-item>
                            <el-form-item label="缩略图">
                                <el-image :src="article.pic" fit="cover" v-if="article.pic" class="w-60" />
                                <el-dialog title="选择缩略图素材" :visible.sync="materialDialog" width="60%" :append-to-body="true">
                                    <hd-wechat-material
                                        :wechat="wechat"
                                        material-type="thumb"
                                        #default="{material}"
                                        :show-type-button="false"
                                        :show-duration-button="false"
                                        duration-type="long"
                                    >
                                        <el-button type="primary" size="mini" @click="selectMediaHandle(material)">选择</el-button>
                                    </hd-wechat-material>
                                </el-dialog>
                                <el-button type="primary" size="mini" @click="materialDialog = true" class="mt-3 block">选择素材</el-button>
                            </el-form-item>
                            <el-form-item label="作者">
                                <el-input v-model="article.author"></el-input>
                            </el-form-item>
                            <el-form-item label="内容摘要">
                                <el-input type="textarea" v-model="article.digest"></el-input>
                            </el-form-item>
                            <el-form-item label="是否显示封面">
                                <el-radio-group v-model="article.show_cover_pic">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="正文内容">
                                <hd-wang-editor v-model="article.content" :sid="wechat.site_id" :key="article.key" />
                            </el-form-item>
                            <el-form-item label="原文链接">
                                <el-input v-model="article.content_source_url"></el-input>
                            </el-form-item>
                            <el-form-item label="打开评论">
                                <el-radio-group v-model="article.need_open_comment">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="粉丝才可评论">
                                <el-radio-group v-model="article.only_fans_can_comment">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-card>
                    </div>
                </div>
            </el-card>
        </el-form>
        <span slot="footer">
            <el-button @click="dialogShow = false">关闭</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isSubmit" v-loading="isSubmit">保存提交</el-button>
        </span>
    </el-dialog>
</template>

<script>
import draggable from 'vuedraggable'
import Mixin from './Mixin'

// 文章
const article = {
    title: '',
    thumb_media_id: '',
    author: '',
    digest: '',
    show_cover_pic: 1,
    pic: '',
    content: '',
    content_source_url: '',
    need_open_comment: 1,
    only_fans_can_comment: 1,
    key: Math.random()
}
const form = {
    title: '',
    type: 'news',
    duration: 'long',
    content: []
}
export default {
    mixins: [Mixin(form)],
    components: { draggable },
    data() {
        return {
            isSubmit: false,
            form: _.merge({}, this.material || form),
            dialogShow: false,
            article: {},
            materialDialog: false
        }
    },
    //编辑数据
    watch: {
        material: {
            handler(material) {
                this.form = _.merge({}, material || form)
                if (this.form.content.length) {
                    this.article = this.form.content[0]
                } else {
                    this.add()
                }
            },
            immediate: true
        }
    },
    methods: {
        //选择素材回调
        selectMediaHandle(material) {
            console.log(material)
            this.article.pic = material.file
            this.article.thumb_media_id = material.response.media_id
            this.materialDialog = false
        },
        //添加
        add() {
            if (this.form.content.length >= 5) {
                return this.$message('图文消息只能添加5个')
            }
            this.article = _.cloneDeep({ ...article, key: Math.random() })
            this.form.content.push(this.article)
        },
        //编辑
        edit(article) {
            this.article = article
        },
        //删除
        del(material) {
            this.$confirm('确定删除吗？', '温馨提示').then(async _ => {
                await axios.delete(`wechat/${this.wechat.id}/material/${material.id}`)
                this.load()
            })
        }
    }
}
</script>

<style></style>
