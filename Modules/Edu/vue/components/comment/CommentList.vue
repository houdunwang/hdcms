<template>
    <div v-loading="loading" id="comment-list" class="text-base">
        <div :id="`comment-${comment.id}`" class="card mb-5" v-for="comment in comments.data" :key="comment.id">
            <!-- 评论 -->
            <div class="card-header bg-white d-flex justify-content-start p-2 md:p-4">
                <router-link :to="{ name: 'space.follower', params: { id: comment.user.id } }">
                    <img :src="comment.user.icon" class="w-8 h-8 rounded object-cover mr-2" />
                </router-link>
                <div class="flex flex-col ">
                    <router-link :to="{ name: 'space.follower', params: { id: comment.user.id } }" class="flex-fill text-secondary">
                        {{ comment.user.name }}
                    </router-link>
                    <div class="text-xs text-gray-600 flex flex-row">
                        <div class="mr-2"><i class="far fa-clock"></i> {{ comment.created_at | fromNow }}</div>
                        <a class="d-inline-block text-gray-500" @click.prevent="replyComment(comment, true)">
                            <i aria-hidden="true" class="fa fa-reply"></i> 回复
                        </a>
                    </div>
                </div>
            </div>
            <div class="text-secondary p-2 md:p-4 comment-content reply-container">
                <div class="markdown" v-html="comment.html" v-markdown></div>
            </div>
            <!-- 评论 END-->
            <!-- 回复 -->
            <div v-if="comment.comments && comment.comments.length > 0" class="text-secondary pb-5 pl-8 reply-container">
                <!-- 回复列表 -->
                <div class="border-t border-dashed border-gray-200 py-3 flex" v-for="reply in comment.comments" :key="reply.id" :id="`comment-${reply.id}`">
                    <router-link :to="{ name: 'space.follower', params: { id: reply.user.id } }">
                        <img :src="reply.user.icon" class="w-6 h-6 object-cover mr-2 rounded" />
                    </router-link>
                    <div class="flex flex-col flex-1">
                        <div class="bg-white d-flex justify-content-start">
                            <div class="flex-fill flex items-center">
                                <div class="text-secondary mr-2">
                                    <router-link :to="{ name: 'space.follower', params: { id: reply.user.id } }" class="text-sm">
                                        {{ reply.user.name }}
                                    </router-link>
                                    <router-link v-if="reply.reply" :to="{ name: 'space.follower', params: { id: reply.reply.user.id } }" class="text-sm">
                                        @ {{ reply.reply.user.name }}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="pt-2 text-secondary text-sm mr-5">
                            <div class="markdown text-base" v-html="reply.html" v-markdown></div>
                            <!-- 快速回复框 -->
                            <div class="mt-2" v-if="isLogin && form.comment && form.comment.id == reply.id && form.editor == false">
                                <el-input class="flex-1 rounded-none mr-1 mb-2" type="textarea" v-model="form.content" placeholder="支持markdown语法" />
                                <el-button type="primary" size="mini" @click.prevent="onSubmit" class="flex-grow-0">发送</el-button>
                            </div>
                            <!-- 快速回复框 END -->
                            <div class="mt-2">
                                <span class="text-xs text-gray-500 mr-2"> <i class="far fa-clock"></i> {{ reply.created_at | fromNow }} </span>
                                <a @click.prevent="replyComment(reply)" class="d-inline-block text-gray-500 text-xs mr-2" v-if="reply.user_id != user.id">
                                    <i aria-hidden="true" class="fa fa-reply"></i> 回复
                                </a>
                                <a class="d-inline-block text-gray-500 text-xs" v-if="reply.permissions.delete" @click.prevent="del(reply)">
                                    删除
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 回复列表 END-->
            </div>
            <!-- <div class="card-footer text-muted bg-white text-sm">
                # {{ comment.id }}
                <a class="d-inline-block mr-2 ml-2 text-gray-500" @click.prevent="replyComment(comment, true)">
                    <i aria-hidden="true" class="fa fa-reply"></i> 回复
                </a>
                <a class="d-inline-block text-gray-500" v-if="comment.permissions.delete" @click.prevent="del(comment)">
                    <i class="fas fa-times-circle"></i> 删除
                </a>
            </div> -->
            <!-- 回复 END -->
        </div>
        <!-- 分页 -->
        <div class="bg-white p-3 border border-gray-200 rounded-sm shadow-sm" v-if="comments.meta && comments.meta.total > 10">
            <el-pagination
                v-if="comments.meta"
                :small="true"
                :hide-on-single-page="true"
                :current-page="comments.meta.current_page"
                :total="comments.meta.total"
                :page-size="15"
                @current-change="load"
                background
                layout="prev, pager, next"
            >
            </el-pagination>
        </div>
        <!-- 评论框 -->
        <div class="card mt-3" id="comment-editor" v-if="isLogin">
            <div class="card-header h-14">
                <div v-if="form.comment" class="text-sm">
                    回复：<span class="text-blue-700 font-bold">{{ form.comment.user.name }}</span>
                    <i class="fas fa-window-close cursor-pointer" @click="resetForm"></i>
                </div>
                <div v-else class="font-bold text-gray-600">发表评论</div>
            </div>
            <div>
                <x-tui-editor v-model="form.content" :sid="site.id" />
                <hd-form-error name="content" />
            </div>
            <div class="card-footer text-muted">
                <button class="btn btn-azure" @click="onSubmit">保存提交</button>
            </div>
        </div>
    </div>
</template>

<script>
const form = { reply_comment_id: null, content: '', editor: false, comment: null }
export default {
    props: ['actionList', 'actionPost'],
    data() {
        return {
            loading: true,
            comments: {},
            page: 1,
            //回复的评论
            form: _.cloneDeep(form)
        }
    },
    watch: {
        $route() {
            this.load(1)
        }
    },
    async created() {
        this.load(1)
        const commentId = this.$route.params.comment_id
        this.scrollTo(`#comment-${commentId}`)
    },
    methods: {
        //加载评论
        async load(page = 1) {
            this.page = page || this.page
            this.loading = true
            this.comments = await axios.get(`${this.actionList}?page=${page}`)
            this.loading = false
        },
        //重置表单
        resetForm() {
            this.form = _.cloneDeep(form)
        },
        //发表评论
        async onSubmit() {
            const { data: comment } = await axios.post(`${this.actionPost}`, this.form)
            this.form = _.cloneDeep(form)
            await this.load()
            this.scrollTo(`#comment-${comment.id}`)
        },
        //删除评论
        async del(comment) {
            this.$confirm('确定删除评论吗?', '温馨提示').then(async _ => {
                await axios.delete(`comment/${comment.id}`)
                this.load()
            })
        },
        //回复
        replyComment(comment, editor = false) {
            if (comment.user_id == this.user.id) {
                return this.$message.error('不能回复自己')
            }
            this.form = _.merge(this.form, { reply_id: comment.id, reply_comment_id: comment.reply_comment_id || comment.id, content: '', editor, comment })
            //使用编辑器
            if (editor) this.scrollTo('#comment-editor')
        }
    }
}
</script>

<style>
.comment-content pre {
    padding: 0 !important;
    margin: 0 -1rem !important;
}
@media (max-width: 768px) {
    .comment-content pre {
        margin: 0 -0.5rem !important;
    }
}
.reply-container pre {
    padding: 0 !important;
}
.markdown pre code.hljs {
    word-break: break-word !important;
}
#comment-list a {
    cursor: pointer;
}
</style>
