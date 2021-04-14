<template>
    <div class="swiper-form">
        <hd-tab :tabs="tabs" />

        <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal" v-loading="loading">
            <el-card shadow="nerver" :body-style="{ padding: '20px' }" class="mb-3">
                <div slot="header">
                    幻灯片配置
                </div>
                <el-form-item label="幻灯描述">
                    <el-input v-model="form.title" placeholder="请输入幻灯片的描述"></el-input>
                    <hd-form-error name="title" />
                </el-form-item>
                <el-form-item label="调用标识">
                    <el-input v-model="form.name" placeholder="用于前台使用的唯一标识"></el-input>
                    <hd-form-error name="name" />
                </el-form-item>
            </el-card>

            <el-card shadow="nerver" :body-style="{ padding: '20px' }" v-if="form.items.length">
                <div slot="header">
                    图片列表
                </div>
                <div class="grid grid-cols-3 gap-5">
                    <div v-for="(item, index) in form.items" :key="index" class="relative p-3 box-border rounded-sm border border-gray-100">
                        <div class="">
                            <el-form-item label="选择图片" label-width="80px">
                                <hd-upload-image v-model="item.img" :sid="hd.site.id" class="w-full" />
                            </el-form-item>
                            <el-form-item label="跳转文章" label-width="80px">
                                <el-input v-model="item.article_title" placeholder="请选择文章" size="small" :readonly="true">
                                    <div slot="append" class="cursor-pointer">
                                        <el-button size="default" @click="showArticle(item)">选择</el-button>
                                        <el-button size="default" v-if="item.article_id">
                                            <a :href="`/Article/${hd.site.id}/content/${item.article_id}.html`" target="_blank" class="text-gray-500">预览</a>
                                        </el-button>
                                        <el-button size="default" v-if="item.article_id">
                                            <a :href="`/Article/site/${hd.site.id}/admin/content/${item.article_id}/edit`" target="_blank" class="text-gray-500"
                                                >编辑</a
                                            >
                                        </el-button>
                                    </div>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="是否显示" label-width="80px">
                                <el-radio-group v-model="item.show" size="mini">
                                    <el-radio-button :label="true">显示</el-radio-button>
                                    <el-radio-button :label="false">隐藏</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                        <i
                            class="fas fa-times-circle absolute -top-3 -right-2 text-lg text-gray-300 hover:text-gray-800 duration-300 cursor-pointer"
                            @click="del(index)"
                        ></i>
                    </div>
                    <hd-form-error name="items" />
                </div>
            </el-card>
            <div class="mt-3">
                <el-button-group>
                    <el-button size="small" @click="add">添加图片</el-button>
                    <el-button type="primary" size="small" @click="onSubmit">保存提交</el-button>
                </el-button-group>
            </div>
        </el-form>
        <!-- 选择文章 -->
        <el-dialog title="选择文章" :visible.sync="articleDialog" width="80%" top="5vh" @select="selectArticle">
            <x-article-table width="160" #default="{content}">
                <el-button-group>
                    <el-button type="success" size="mini" @click="selectArticle(content)">选择</el-button>
                    <el-button size="mini">
                        <a :href="`/Article/${hd.site.id}/content/${content.id}.html`" target="_blank" class="text-gray-500">预览</a>
                    </el-button>
                </el-button-group>
            </x-article-table>
        </el-dialog>
    </div>
</template>

<script>
const form = { title: '', name: '', items: [] }
import tabs from './tabs'
export default {
    props: ['id'],
    data() {
        return { form: Object.assign({}, form), tabs, articleDialog: false, currentItem: null, loading: true }
    },
    async created() {
        if (this.id) {
            this.form = await axios.get(`swiper/${this.id}`)
        }
        this.loading = false
    },
    methods: {
        add() {
            this.form.items.push({ img: '', article_title: '', article_id: '', show: true })
        },
        del(index) {
            this.$confirm(`确定删除吗？`, '温馨提示').then(_ => {
                this.form.items.splice(index, 1)
            })
        },
        //提交
        async onSubmit() {
            if (!this.form.items.length) {
                return this.$message.error('请添加幻灯片图片')
            }
            const url = this.id ? `swiper/${this.id}` : 'swiper'
            await axios[this.id ? 'put' : 'post'](url, this.form)
            this.form = Object.assign({}, form)
            this.hd.router('admin.swiper.index')
        },
        //选择文章dialog
        showArticle(item) {
            this.currentItem = item
            this.articleDialog = true
        },
        //选择文章
        selectArticle(article) {
            this.currentItem.article_id = article.id
            this.currentItem.article_title = article.title
            this.articleDialog = false
        }
    }
}
</script>

<style lang="scss">
.swiper-form {
    .el-upload {
        width: 100%;
    }
    .hd-image-uploader .hd-image-uploader-icon {
        height: 80px;
        line-height: 80px;
    }
    .hd-image-uploader .avatar {
        width: 100%;
        height: 80px;
        object-fit: cover !important;
    }
}
</style>
