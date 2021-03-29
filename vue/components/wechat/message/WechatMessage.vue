<template>
    <div>
        <el-radio-group v-model="wid" v-if="showWeChatButton" size="mini" @change="load(1)">
            <el-radio-button :label="wechat.id" v-for="wechat in wechats" :key="wechat.id">
                {{ wechat.title }}
            </el-radio-button>
        </el-radio-group>
        <!-- 消息类型选择按钮 -->
        <el-radio-group v-model="type" size="mini" v-if="showTypeButton" class="mt-2 block" @change="load(1)">
            <el-radio-button :label="t.type" v-for="(t, index) in types" :key="index">
                {{ t.title }}
            </el-radio-button>
        </el-radio-group>
        <!-- 消息类型选择按钮 END-->
        <!-- 消息列表 -->
        <el-table :data="messages.data" border stripe class="mt-3" v-loading="loading">
            <el-table-column v-for="col in columns" :prop="col.id" :key="col.id" :label="col.label" :width="col.width"> </el-table-column>
            <el-table-column label="回复内容" #default="{row:message}">
                <!-- 预览素材 -->
                <hd-wechat-message-preview :message="message" class-name="w-10 h-10" />
            </el-table-column>
            <el-table-column width="200" #default="{ row: message }" align="center">
                <el-button-group>
                    <el-button type="success" size="mini" @click="edit(message)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="del(message)">删除</el-button>
                    <slot :message="message"> </slot>
                </el-button-group>
            </el-table-column>
        </el-table>
        <!-- 消息管理 -->
        <el-button size="mini" @click="add()" class="mt-3" v-if="showAddButton && wid">添加消息</el-button>
        <el-dialog title="消息管理" :visible.sync="showDialog" width="60%" top="1rem" :append-to-body="true" :close-on-click-modal="false">
            <component :is="component" :message="message" :site_id="site_id" :wechat_id="wid" :module_id="module_id" :key="showDialog" @onSubmit="onSubmit" />
        </el-dialog>
    </div>
</template>

<script>
import { types, columns } from './data'
export default {
    props: {
        //站点编号
        site_id: { required: true },
        //微信编号
        wechat_id: { default: null },
        //模块编号
        module_id: { default: '' },
        //消息内容
        messageType: { type: String, default: 'text' },
        //公众号选择按钮
        showWeChatButton: { type: Boolean, default: true },
        //消息类型选择按钮
        showTypeButton: { type: Boolean, default: true },
        //是否显示添加按钮
        showAddButton: { type: Boolean, default: true }
    },
    data() {
        return {
            loading: true,
            //公众号集合
            wechats: [],
            //消息列表
            messages: [],
            //显示对话框
            showDialog: false,
            //消息数据
            message: {},
            //当前选中的公众号
            wid: this.wechat_id,
            //类型列表
            types,
            //当前选中的类型
            type: this.messageType,
            //表格列
            columns
        }
    },
    computed: {
        component() {
            return `hdWechatMessage${_.upperFirst(this.type)}`
        }
    },
    async created() {
        await this.loadWechats()
        this.load()
    },
    methods: {
        //加载公众号列表
        async loadWechats() {
            this.wechats = await axios.get(`/api/site/${this.site_id}/wechat`)
            if (!this.wid && this.wechats.length) {
                this.wid = this.wechats[0].id
            }
        },
        //加载消息列表
        async load(page = 1) {
            this.loading = true
            const url = `/api/site/${this.site_id}/wechat/${this.wid}/message?type=${this.type}&page=${page}&module=${this.module_id}`
            this.messages = await axios.get(url)
            this.loading = false
        },
        //编辑数据
        edit(message) {
            this.message = message
            this.showDialog = true
        },
        add() {
            this.message = null
            this.showDialog = true
        },
        //删除
        del(message) {
            this.$confirm('确定删除吗？', '温馨提示').then(async _ => {
                const url = `/api/site/${this.site_id}/wechat/${this.wid}/message/${message.id}`
                await axios.delete(url)
                this.load()
            })
        },
        //组件提交回调
        onSubmit() {
            this.load()
            this.showDialog = false
        }
    }
}
</script>

<style></style>
