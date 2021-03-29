<template>
    <el-form :model="form" ref="form" label-width="100px" :inline="false" size="normal">
        <hd-wechat-message-rule :form="form" />
        <div class="flex">
            <div class="w-60 preview">
                <draggable v-model="form.content">
                    <div
                        v-for="(art, index) in form.content"
                        :key="index"
                        class="border border-gray-200 mb-1 cursor-pointer flex"
                        :class="{ 'p-2 items-start': index, 'border-green-600': article == art, 'flex-col': !index }"
                        @click="edit(art)"
                    >
                        <el-image :src="art.picurl || `/images/nopic480x310.jpg`" fit="cover" :class="{ 'w-1/3 order-2': index }" class="border"></el-image>
                        <div :class="{ 'w-2/3 flex-1 pr-2': index }">
                            <div class="bg-gray-500 font-light p-1 text-white flex justify-center items-center text-sm" v-if="!index">
                                {{ art.title }}
                            </div>
                            <div class="text-gray-500 font-light text-xs leading-snug" v-else>
                                {{ art.description | truncate(30) }}
                            </div>
                        </div>
                    </div>
                </draggable>
                <el-button size="mini" @click="add">添加图文</el-button>
            </div>

            <div class="flex-1 pl-3">
                <hd-form-error name="content" />
                <el-card shadow="nerver" :body-style="{ padding: '20px' }" v-if="article">
                    <el-form-item label="文章标题">
                        <el-input v-model="article.title"></el-input>
                    </el-form-item>
                    <el-form-item label="文章简介">
                        <el-input v-model="article.description"></el-input>
                    </el-form-item>
                    <el-form-item label="缩略图">
                        <hd-upload-image v-model="article.picurl" fit="fill" class="w-36 h-auto " />
                    </el-form-item>
                    <el-form-item label="跳转链接">
                        <el-input v-model="article.url"></el-input>
                    </el-form-item>
                    <el-button type="primary" @click="onSubmit" :disabled="isSubmit" v-loading="isSubmit" class="block mt-3">保存提交</el-button>
                </el-card>
            </div>
        </div>
    </el-form>
</template>

<script>
import mixin from './mixin'
import { article } from '../data'
import draggable from 'vuedraggable'

export default {
    mixins: [mixin],
    components: { draggable },
    data() {
        return {
            field: { type: 'news', content: [] },
            //当前编辑的文章
            article: null
        }
    },
    mounted() {
        if (this.form.content.length == 0) {
            this.add()
        } else {
            this.edit(this.form.content[0])
        }
    },
    methods: {
        edit(article) {
            this.article = article
        },
        add() {
            if (this.form.content.length >= 5) {
                return this.$message('图文消息只能添加5个')
            }
            this.form.content.push((this.article = _.cloneDeep(article)))
        }
    }
}
</script>

<style></style>
